import { appwriteConfig, databases } from '@/services/config'
import { createFiles } from '@/services/files/createFiles'
import { deleteManyFilesByIds } from '@/services/files/deleteManyFilesByIds'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { tagsToArray } from '@/services/utils/tagsToArray'
import {
  type Post,
  type PostModel,
  type UpdatedPostData
} from '@/types'
import { AppwriteException } from 'appwrite'

export async function updatePost (post: UpdatedPostData) {
  try {
    const tags = tagsToArray(post?.tags ?? '')
    const previousFilesPreserved = post.originalFiles.filter(
      file => !post.filesToRemoveById.includes(file.$id)
    )
    const updatedFiles =
      post.newFiles.length > 0
        ? [...previousFilesPreserved, ...(await createFiles(post.newFiles))]
        : previousFilesPreserved

    if (post.filesToRemoveById.length > 0) {
      await deleteManyFilesByIds(post.filesToRemoveById)
    }

    const { filesId, ...updatedPost } =
      await databases.updateDocument<PostModel>(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        post.postId,
        {
          caption: post.caption,
          location: post.location,
          filesId: updatedFiles.map(file => file.$id),
          tags
        }
      )

    const data: Post = {
      ...updatedPost,
      files: updatedFiles
    }
    return appwriteResponse({
      data,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'Post updated successfully',
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
