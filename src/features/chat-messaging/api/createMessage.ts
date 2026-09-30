import { appwriteConfig } from '@shared/config'
import { databases } from '@shared/api'
import type { AppwriteResponse, ChatMemberModel, MessageModel, UserModel } from '@shared/types'
import { ID, Permission, Query, Role } from 'appwrite'

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
}): Promise<AppwriteResponse<MessageModel | null> | null> {
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
      try {
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
      } catch (err) {
        console.error(err)
      }
    })

    return {
      data: message,
      message: 'Message created successfully.',
      status: 'CREATED',
      code: 201
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
