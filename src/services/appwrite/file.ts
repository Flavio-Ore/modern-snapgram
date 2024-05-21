import { appwriteConfig, storage } from '@/services/appwrite/config'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import { AppwriteException, ID, ImageGravity } from 'appwrite'

export async function createFile (file: File) {
  try {
    const createdFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )
    return appwriteResponse({
      data: createdFile,
      code: APPWRITE_RESPONSE_CODES.CREATED.code,
      message: 'File created',
      status: APPWRITE_RESPONSE_CODES.CREATED.text
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

// ============================== GET FILE URL
export async function getFilePreview (fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      180,
      180,
      ImageGravity.Top,
      10
    )
    console.log(fileUrl)

    return appwriteResponse({
      data: fileUrl.toString(),
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'File found',
      status: APPWRITE_RESPONSE_CODES.OK.text
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

// ============================== DELETE FILE
export async function deleteFile (fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)
    return appwriteResponse({
      data: null,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code,
      message: 'File deleted.',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.text
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
