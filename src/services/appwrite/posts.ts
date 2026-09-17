import { type INewPost, type IUpdatePost, type Post } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

import { isObjectEmpty } from '@/lib/utils'
import { appwriteConfig, databases, storage } from '@/services/appwrite/config'
import {
  deleteFile
} from '@/services/appwrite/file'
import {
  APPWRITE_ERROR_TYPES,
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'

// ============================================================
// POSTS
// ============================================================
export async function findInfinitePosts ({
  lastId = '',
  queries = []
}: {
  lastId: string
  queries: string[]
}) {
  const query = [...queries, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    query.push(Query.cursorAfter(lastId.toString()))
  }
  try {
    const postsDocumentList = await databases.listDocuments<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      query
    )
    return postsDocumentList.documents
  } catch (error) {
    console.error(error)
    return []
  }
}
// ============================== CREATE POST
export async function createPost (post: INewPost) {
  let tags
  let newImage = {
    url: '',
    id: ''
  }
  const hasFile = post.file.length > 0 && post.file[0]
  try {
    if (hasFile !== false) {
      const file = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        hasFile
      )

      const fileUrl = storage.getFileView(
        appwriteConfig.storageId,
        file.$id
      )
      console.log('fileUrl :>> ', fileUrl)

      if (fileUrl == null) {
        await storage.deleteFile(appwriteConfig.storageId, file.$id)
      } else {
        if (post?.tags == null) tags = []
        tags = post.tags?.replace(/ /g, '').split(',')
        newImage = {
          ...newImage,
          url: new URL(fileUrl).toString(),
          id: file.$id
        }
      }
    }
    const newPost = await databases.createDocument<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        location: post.location,
        imageUrl: newImage.url,
        imageId: newImage.id,
        tags
      }
    )
    return appwriteResponse({
      data: newPost,
      code: APPWRITE_RESPONSE_CODES.CREATED.code,
      message: 'Post created successfully',
      status: APPWRITE_RESPONSE_CODES.CREATED.text
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      if (e.type === APPWRITE_ERROR_TYPES.storage_file_type_unsupported) {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: e.message,
          status: e.name
        })
      }
      if (e.type === APPWRITE_ERROR_TYPES.storage_device_not_found) {
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
// ============================== GET POST BY ID
export async function findPostById (postId: string) {
  try {
    const postDocument = await databases.getDocument<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )

    return appwriteResponse({
      data: postDocument,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'Post found',
      status: APPWRITE_RESPONSE_CODES.OK.text
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

// ============================== UPDATE POST
export async function updatePost (post: IUpdatePost) {
  const hastFile = post.file.length > 0 && post.file[0]

  try {
    let tags
    let newImage = {
      url: post.imageUrl,
      id: post.imageId
    }

    if (hastFile !== false) {
      // Upload new file to appwrite storage
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        hastFile
      )
      // Get new file url
      const fileUrl = storage.getFileView(
        appwriteConfig.storageId,
        uploadedFile.$id
      )
      if (fileUrl == null) {
        await deleteFile(uploadedFile.$id)
      } else {
        newImage = {
          ...newImage,
          url: new URL(fileUrl),
          id: uploadedFile.$id
        }
      }
    }

    // Convert tags into array
    if (post?.tags == null) tags = []
    tags = post.tags?.replace(/ /g, '').split(',')

    //  Update post
    const updatedPost = await databases.updateDocument<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: newImage.url,
        imageId: newImage.id,
        location: post.location,
        tags
      }
    )

    // Failed to update
    if (isObjectEmpty(updatedPost)) {
      // Delete new file that has been recently uploaded
      if (hastFile !== false) await storage.deleteFile(appwriteConfig.storageId, newImage.id)
      // If no new file uploaded, just throw error
      throw Error('Post not updated, try again')
    }

    // Safely delete old file after successful update
    if (hastFile !== false) await storage.deleteFile(appwriteConfig.storageId, post.imageId)

    return appwriteResponse({
      data: updatedPost,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'Post updated successfully',
      status: APPWRITE_RESPONSE_CODES.OK.text
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

// ============================== DELETE POST
export async function deletePost ({
  postId,
  imageId
}: {
  postId: string
  imageId: string
}) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )
    console.log('statusCode :>> ', statusCode)
    await storage.deleteFile(appwriteConfig.storageId, imageId)
    return appwriteResponse({
      data: null,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code,
      message: 'Post deleted successfully',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.text
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
