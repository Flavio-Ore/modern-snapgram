import { ID, type Models } from 'appwrite'
import { type EmptyObject } from 'react-hook-form'
import { appwriteConfig, storage } from './config'

export async function uploadFile (
  file: File
): Promise<Models.File | EmptyObject> {
  try {
    const newFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )
    return newFile
  } catch (error) {
    console.error(error)
    return {}
  }
}

// ============================== GET FILE URL
export async function getFilePreview (fileId: string): Promise<URL | ''> {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      180,
      180,
      'top',
      100
    )
    if (fileUrl.toString().trim().length === 0) throw Error('File not found')
    return fileUrl
  } catch (error) {
    console.error(error)
    return ''
  }
}

// ============================== DELETE FILE
export async function deleteFile (fileId: string): Promise<{ status: string }> {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)
    return {
      status: 'success'
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'error'
    }
  }
}
