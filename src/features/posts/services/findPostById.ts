import { appwriteConfig, databases } from '@/services/config'
import { getFilesWithUrlsByIds } from '@/services/files/getFilesWithUrlsByIds'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type Post,
  type PostModel
} from '@/types'
import { AppwriteException } from 'appwrite'

export async function findPostById (postId: Post['$id']) {
  try {
    const { filesId, ...postDocument } = await databases.getDocument<PostModel>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )

    const data: Post = {
      ...postDocument,
      files: await getFilesWithUrlsByIds(filesId)
    }
    return appwriteResponse({
      data,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'Post found',
      status: APPWRITE_RESPONSE_CODES.OK.status
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
