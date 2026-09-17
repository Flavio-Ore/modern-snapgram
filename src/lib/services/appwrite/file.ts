import { appwriteConfig, storage } from '@/lib/services/appwrite/config'
import { ID } from 'appwrite'

export async function uploadFile (
  file: File
) {
  try {
    const newFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )
    return newFile
  } catch (error) {
    console.error(error)
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
      'top',
      100
    )
    if (fileUrl.toString().trim().length === 0) throw Error('File not found')
    return fileUrl
  } catch (error) {
    console.error(error)
    return null
  }
}

// ============================== DELETE FILE
export async function deleteFile (fileId: string) {
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
