import { appwriteConfig } from '@shared/config'
import { databases } from '@shared/api'
import type { AppwriteResponse, MessageModel } from '@shared/types'

export async function deleteMessage ({
  messageId
}: {
  messageId: MessageModel['$id']
}): Promise<AppwriteResponse<null> | null> {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      messageId
    )

    return {
      data: null,
      message: 'Message deleted successfully.',
      status: 'NO_CONTENT',
      code: 204
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
