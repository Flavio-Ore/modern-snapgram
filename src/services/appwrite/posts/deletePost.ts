import { appwriteConfig, databases } from '@/services/appwrite/config'
import {
  deleteManyFilesByIds
} from '@/services/appwrite/file'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type DeletePostParams
} from '@/types'
import { AppwriteException } from 'appwrite'

export async function deletePost ({ postId, filesId }: DeletePostParams) {
  try {
    await Promise.all([
      databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        postId
      ),
      deleteManyFilesByIds(filesId)
    ])

    return appwriteResponse({
      data: null,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code,
      message: 'Post deleted successfully',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        code: e.code,
        message: e.message,
        status: e.type
      })
    }
    return null
  }
}
