import { appwriteConfig, databases } from '@/services/appwrite/config'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import { type MessageModel, type UserModel } from '@/types'
import { AppwriteException, ID, Permission, Query, Role } from 'appwrite'

export async function findInfiniteMessages ({
  lastId = '',
  senderId,
  receiversId
}: {
  lastId: MessageModel['$id']
  senderId: UserModel['$id']
  receiversId: Array<UserModel['$id']>
}) {
  const query = [
    Query.or([
      Query.and([
        Query.contains('sender', [senderId]),
        Query.contains('receivers', receiversId)
      ]),
      Query.and([
        Query.contains('sender', receiversId),
        Query.contains('receivers', [senderId])
      ])
    ]),
    Query.orderDesc('$createdAt'),
    Query.limit(20)
  ]
  if (lastId.trim().length !== 0) {
    query.push(Query.cursorAfter(lastId))
  }
  try {
    const messagesDocumentList = await databases.listDocuments<MessageModel>(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      query
    )

    return appwriteResponse({
      data: messagesDocumentList.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
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

export async function createMessage ({
  body = '',
  sender,
  receivers
}: {
  body: MessageModel['body']
  sender: MessageModel['sender']
  receivers: MessageModel['receivers']

}) {
  try {
    const createdMessage = await databases.createDocument<MessageModel>(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      ID.unique(),
      {
        body,
        sender,
        receivers
      },
      [Permission.write(Role.user(sender))]
    )

    return appwriteResponse({
      data: createdMessage,
      code: APPWRITE_RESPONSE_CODES.CREATED.code,
      message: APPWRITE_RESPONSE_CODES.CREATED.message,
      status: APPWRITE_RESPONSE_CODES.CREATED.status
    })
  } catch (e) {
    console.error({ e })
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
        isEdited: true
      }
    )

    return appwriteResponse({
      data: updatedMessage,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
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

export async function deleteMessage ({ messageId }: { messageId: string }) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      messageId
    )

    return appwriteResponse({
      data: null,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code,
      message: APPWRITE_RESPONSE_CODES.NO_CONTENT.message,
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status
    })
  } catch (e) {
    console.error({ e })
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
