import { appwriteConfig, databases } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type ChatMemberModel,
  type MessageModel,
  type UserModel
} from '@/types'
import { AppwriteException, ID, Permission, Query, Role } from 'appwrite'

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
