import { appwriteConfig, databases } from '@/services/config'
import { createFiles } from '@/services/files/createFiles'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_ERROR_TYPES } from '@/services/utils/constants/APPWRITE_ERROR_TYPES'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { tagsToArray } from '@/services/utils/tagsToArray'
import {
  type NewPostData,
  type Post,
  type PostModel
} from '@/types'
import { AppwriteException, ID } from 'appwrite'

export async function createPost (post: NewPostData) {
  const tags = tagsToArray(post?.tags ?? '')
  try {
    const newFiles = await createFiles(post.newFiles)
    const { filesId, ...newPost } = await databases.createDocument<PostModel>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        location: post.location,
        filesId: newFiles.map(file => file.$id),
        tags
      }
    )
    const data: Post = {
      ...newPost,
      files: newFiles
    }
    return appwriteResponse({
      data,
      code: APPWRITE_RESPONSE_CODES.CREATED.code,
      message: 'Post created successfully',
      status: APPWRITE_RESPONSE_CODES.CREATED.status
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      const message =
        e.type === APPWRITE_ERROR_TYPES.storage_file_type_unsupported
          ? 'File type not supported.'
          : e.type === APPWRITE_ERROR_TYPES.storage_device_not_found
            ? 'Error uploading file, try again later.'
            : e.type === APPWRITE_ERROR_TYPES.document_invalid_structure
              ? 'Invalid content.'
              : e.message

      return appwriteResponse({
        data: null,
        code: e.code,
        message,
        status: e.type
      })
    }
    return null
  }
}
