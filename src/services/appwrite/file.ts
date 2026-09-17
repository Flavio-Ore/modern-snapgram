import { appwriteConfig, storage } from '@/services/appwrite/config'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import { type FileModelWithUrl } from '@/types'
import { AppwriteException, ID, ImageGravity } from 'appwrite'

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

// ============================== GET FILE URL
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

// ============================== DELETE FILE
export async function deleteFile (fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.postsStorageId, fileId)
    return appwriteResponse({
      data: null,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code,
      message: 'File deleted.',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status
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

export async function deleteManyFilesByIds (filesId: string[]) {
  await Promise.all(
    filesId.map(async fileId => {
      await storage.deleteFile(appwriteConfig.postsStorageId, fileId)
    })
  )
}

async function getFileHash (file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function compareFilesByContent (file1: File, file2: File) {
  const file1Hash = await getFileHash(file1)
  const file2Hash = await getFileHash(file2)
  return file1Hash === file2Hash
}
