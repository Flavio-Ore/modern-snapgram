import { appwriteConfig, storage } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { AppwriteException, ImageGravity } from 'appwrite'

export async function getFilePreview (fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.postsStorageId,
      fileId,
      180,
      180,
      ImageGravity.Top,
      10
    )
    return appwriteResponse({
      data: fileUrl.toString(),
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'File found',
      status: APPWRITE_RESPONSE_CODES.OK.status
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
