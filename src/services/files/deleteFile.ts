import { appwriteConfig, storage } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { AppwriteException } from 'appwrite'

export async function deleteFile (fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.postsStorageId, fileId)
    return appwriteResponse({
      data: null,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code,
      message: 'File deleted.',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        code: e.code,
        message: e.message,
        status: e.name
      })
    }
    return null
  }
}
