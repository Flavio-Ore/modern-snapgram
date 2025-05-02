import { appwriteConfig, storage } from '@/services/config'

export async function getFilesWithUrlsByIds (filesId: string[]) {
  try {
    return await Promise.all(
      filesId.map(async fileId => {
        const file = await storage.getFile(
          appwriteConfig.postsStorageId,
          fileId
        )
        return {
          ...file,
          url: storage
            .getFileView(appwriteConfig.postsStorageId, fileId)
            .toString()
        }
      })
    )
  } catch (e) {
    console.error(e)
    return []
  }
}
