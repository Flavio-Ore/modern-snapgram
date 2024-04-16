import { appwriteConfig, storage } from '@/services/appwrite/config'
import { ID } from 'appwrite'

export async function createFile (
  file: File
) {
  try {
    return await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )
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
      10
    )
    console.log(fileUrl)
    if (fileUrl?.href?.trim()?.length === 0) throw Error('File not found')
    return fileUrl.toString()
  } catch (error) {
    console.error(error)
    return ''
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
