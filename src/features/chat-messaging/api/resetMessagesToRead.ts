import { appwriteConfig } from '@shared/config'
import { databases } from '@shared/api'
import type { AppwriteResponse, ChatMemberModel } from '@shared/types'

export async function resetMessagesToRead ({
  chatId
}: {
  chatId: ChatMemberModel['$id']
}): Promise<AppwriteResponse<ChatMemberModel | null> | null> {
  try {
    const chatMembership = await databases.updateDocument<ChatMemberModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatMemberCollectionId,
      chatId,
      {
        messages_to_read: 0
      }
    )

    return {
      data: chatMembership,
      message: 'Messages from chat marked as read successfully.',
      status: 'OK',
      code: 200
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
