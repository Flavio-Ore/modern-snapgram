import { appwriteConfig, databases } from '@/services/appwrite/config'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import {
  type ChatMemberModel,
  type ChatRoomModel,
  type MessageModel,
  type UserModel
} from '@/types'
import { AppwriteException, ID, Permission, Query, Role } from 'appwrite'

export async function findInfiniteMessages ({
  lastId = '',
  query = []
}: {
  lastId: MessageModel['$id']
  query: string[]
}) {
  const queries = [...query, Query.limit(10)]
  try {
    if (lastId.trim().length !== 0) {
      queries.push(Query.cursorAfter(lastId))
    }

    const messagesDocumentList = await databases.listDocuments<MessageModel>(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      queries
    )

    return appwriteResponse({
      data: messagesDocumentList.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ error: e })
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}
export async function findInfiniteMessagesByChatRoomId ({
  lastId = '',
  chatRoomId
}: {
  lastId: MessageModel['$id']
  chatRoomId: ChatRoomModel['$id']
}) {
  return await findInfiniteMessages({
    lastId,
    query: [
      Query.equal('related_chat', chatRoomId),
      Query.orderDesc('$createdAt')
    ]
  })
}
export async function findInfiniteMessagesByAuthorsAndReceivers ({
  lastId = '',
  authorChatId,
  receiversChatId
}: {
  lastId: MessageModel['$id']
  authorChatId: ChatMemberModel['$id']
  receiversChatId: Array<ChatMemberModel['$id']>
}) {
  return await findInfiniteMessages({
    lastId,
    query: [
      Query.or([
        Query.and([
          Query.contains('author_chat_id', [authorChatId]),
          Query.contains('receivers_chat_id', receiversChatId)
        ]),
        Query.and([
          Query.contains('author_chat_id', receiversChatId),
          Query.contains('receivers_chat_id', [authorChatId])
        ])
      ]),
      Query.orderDesc('$createdAt'),
      Query.limit(10)
    ]
  })
}

export async function createMessage ({
  body = '',
  authorAccountId,
  authorChat,
  receiversChat,
  chatRoomId
}: {
  body: MessageModel['body']
  authorAccountId: UserModel['accountId']
  authorChat: ChatMemberModel
  receiversChat: ChatMemberModel[]
  chatRoomId: ChatMemberModel['chat_room']['$id']
}) {
  try {
    const message = await databases.createDocument<MessageModel>(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      ID.unique(),
      {
        body,
        author_chat: authorChat.$id,
        author_chat_id: authorChat.$id,
        receivers_chat: receiversChat.map(receiverChat => receiverChat.$id),
        receivers_chat_id: receiversChat.map(receiverChat => receiverChat.$id),
        related_chat: chatRoomId
      },
      [Permission.write(Role.user(authorAccountId))]
    )

    receiversChat.forEach(async receiverChatId => {
      const prevReceiverChat = await databases.getDocument<ChatMemberModel>(
        appwriteConfig.databaseId,
        appwriteConfig.chatMemberCollectionId,
        receiverChatId.$id,
        [Query.select(['messages_to_read'])]
      )

      await databases.updateDocument<ChatMemberModel>(
        appwriteConfig.databaseId,
        appwriteConfig.chatMemberCollectionId,
        receiverChatId.$id,
        {
          messages_to_read: prevReceiverChat.messages_to_read + 1
        }
      )
    })

    return appwriteResponse({
      data: message,
      message: 'Message created successfully.',
      status: APPWRITE_RESPONSE_CODES.CREATED.status,
      code: APPWRITE_RESPONSE_CODES.CREATED.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

export async function editMessage ({
  messageId,
  newBody
}: {
  messageId: MessageModel['$id']
  newBody: MessageModel['body']
}) {
  try {
    const updatedMessage = await databases.updateDocument<MessageModel>(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      messageId,
      {
        body: newBody,
        is_edited: true
      }
    )

    return appwriteResponse({
      data: updatedMessage,
      message: 'Message updated successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}

export async function deleteMessage ({
  messageId
}: {
  messageId: MessageModel['$id']
}) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      messageId
    )

    return appwriteResponse({
      data: null,
      message: 'Message deleted successfully.',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}
