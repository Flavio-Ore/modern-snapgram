import { appwriteConfig, databases } from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type ChatRoomModel
} from '@/types'
import { AppwriteException } from 'appwrite'

export async function deleteChatRoomById ({
  chatRoomId
}: {
  chatRoomId: ChatRoomModel['$id']
}) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      chatRoomId
    )

    return appwriteResponse({
      data: null,
      message: 'Chat room deleted successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
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
