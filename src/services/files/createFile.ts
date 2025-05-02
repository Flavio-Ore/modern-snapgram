import { appwriteConfig, storage } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { AppwriteException, ID } from 'appwrite'

export async function createFile (file: File) {
  try {
    const createdFile = await storage.createFile(
      appwriteConfig.postsStorageId,
      ID.unique(),
      file
    )
    return appwriteResponse({
      data: createdFile,
      code: APPWRITE_RESPONSE_CODES.CREATED.code,
      message: 'File created',
      status: APPWRITE_RESPONSE_CODES.CREATED.status
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      if (e.type === 'storage_file_type_unsupported') {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: e.message,
          status: e.name
        })
      }
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
