import { appwriteConfig, storage } from '@/services/appwrite/config'

export async function deleteManyFilesByIds (filesId: string[]) {
  await Promise.all(
    filesId.map(async fileId => {
      await storage.deleteFile(appwriteConfig.postsStorageId, fileId)
    })
  )
}
