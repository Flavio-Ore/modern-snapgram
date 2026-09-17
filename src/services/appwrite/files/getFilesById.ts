import { appwriteConfig, storage } from '@/services/appwrite/config'

export async function getFilesById (filesId: string[]) {
  try {
    return await Promise.all(
      filesId.map(async fileId => {
        return storage.getFileView(appwriteConfig.postsStorageId, fileId)
      })
    )
  } catch (e) {
    console.error(e)
    return []
  }
}
