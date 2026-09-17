import { appwriteConfig, databases } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type MessageModel
} from '@/types'
import { AppwriteException } from 'appwrite'

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
