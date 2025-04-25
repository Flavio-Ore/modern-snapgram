import { appwriteConfig, databases } from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type MessageModel
} from '@/types'
import { AppwriteException } from 'appwrite'

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
