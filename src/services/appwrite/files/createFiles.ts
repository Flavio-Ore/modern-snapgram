import { appwriteConfig, storage } from '@/services/appwrite/config'
import { deleteManyFilesByIds } from '@/services/appwrite/files/deleteManyFilesByIds'
import { type FileModelWithUrl } from '@/types'
import { ID } from 'appwrite'

export async function createFiles (files: File[]): Promise<FileModelWithUrl[]> {
  const filesIds: string[] = []
  try {
    const processedFiles = await Promise.all(
      files.map(async file => {
        const id = ID.unique()
        filesIds.push(id)
        return await storage.createFile(appwriteConfig.postsStorageId, id, file)
      })
    )

    return await Promise.all(
      processedFiles.map(async file => {
        return {
          ...file,
          url: storage
            .getFileView(appwriteConfig.postsStorageId, file.$id)
            .toString()
        }
      })
    )
  } catch (e) {
    console.error(e)
    deleteManyFilesByIds(filesIds)
    return []
  }
}
