import { appwriteConfig } from '@shared/config'
import { databases } from '@shared/api'
import type { AppwriteResponse, MessageModel } from '@shared/types'

export async function editMessage ({
  messageId,
  newBody
}: {
  messageId: MessageModel['$id']
  newBody: MessageModel['body']
}): Promise<AppwriteResponse<MessageModel | null> | null> {
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

    return {
      data: updatedMessage,
      message: 'Message updated successfully.',
      status: 'OK',
      code: 200
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
