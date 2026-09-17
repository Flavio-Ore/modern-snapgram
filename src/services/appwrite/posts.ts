import {
  type INewPost,
  type IUpdatePost,
  type Post,
  type PostTest
} from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

import { isObjectEmpty } from '@/lib/utils'
import {
  appwriteConfig,
  betaAppwriteConfig,
  databases,
  storage
} from '@/services/appwrite/config'
import { deleteFile } from '@/services/appwrite/file'
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

      const fileUrl = storage.getFileView(appwriteConfig.storageId, file.$id)
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
          message: 'File type not supported.',
          status: e.name
        })
      }
      if (e.type === APPWRITE_ERROR_TYPES.storage_device_not_found) {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: 'Error uploading file, try again later.',
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
      if (hastFile !== false) {
        await storage.deleteFile(appwriteConfig.storageId, newImage.id)
      }
      // If no new file uploaded, just throw error
      throw Error('Post not updated, try again')
    }

    // Safely delete old file after successful update
    if (hastFile !== false) {
      await storage.deleteFile(appwriteConfig.storageId, post.imageId)
    }

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

// ============================================================
// BETAS
// ============================================================

export async function betaFindInfinitePosts () {
  try {
    const postsDocumentList = await databases.listDocuments<PostTest>(
      appwriteConfig.databaseId,
      betaAppwriteConfig.betaPostsCollectionId,
      [Query.limit(2)]
    )
    return postsDocumentList.documents
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function betaCreatePost (post: INewPost) {
  let tags: string[]
  const newFiles: Array<{ url: string, id: string }> = []
  const hasFiles = post.file.length > 0 && post.file
  console.log('hasFiles :>> ', hasFiles)
  try {
    if (hasFiles !== false) {
      const files = await Promise.all(
        hasFiles.map(async file => {
          return await storage.createFile(
            file.type === 'video/mp4' || file.type === 'image/gif'
              ? betaAppwriteConfig.betaVideosStorageId
              : betaAppwriteConfig.storageId,
            ID.unique(),
            file
          )
        })
      )
      const fileUrls = files.map(file => {
        return storage.getFileView(
          betaAppwriteConfig.betaVideosStorageId,
          file.$id
        )
      })

      console.log('fileUrls :>> ', fileUrls)

      if (fileUrls.length === 0) {
        await Promise.all(
          files.map(
            async file =>
              await storage.deleteFile(appwriteConfig.storageId, file.$id)
          )
        )
      } else {
        newFiles.push(
          ...files.map((file, index) => {
            return {
              url: new URL(fileUrls[index]).toString(),
              id: file.$id
            }
          })
        )
      }
    }

    tags =
      post?.tags == null || post.tags.trim().length <= 0
        ? []
        : post.tags?.replace(/ /g, '').split(',') ?? []
    console.log(
      'newFiles.map(file => file.id) :>> ',
      newFiles.map(file => file.id)
    )
    console.log('tags :>> ', tags)
    console.log('new post :>> ', post)
    const { filesId, ...newPost } = await databases.createDocument<PostTest>(
      appwriteConfig.databaseId,
      betaAppwriteConfig.betaPostsCollectionId,
      ID.unique(),
      {
        creator: ['6663ee2b000ffca55d5b'],
        caption: post.caption,
        location: post.location,
        filesId: newFiles.map(file => file.id),
        tags
      }
    )

    return appwriteResponse({
      data: {
        ...newPost,
        files: newFiles
      },
      code: APPWRITE_RESPONSE_CODES.CREATED.code,
      message: 'Post created successfully',
      status: APPWRITE_RESPONSE_CODES.CREATED.text
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      if (e.type === APPWRITE_ERROR_TYPES.storage_file_type_unsupported) {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: 'File type not supported.',
          status: e.name
        })
      }
      if (e.type === APPWRITE_ERROR_TYPES.storage_device_not_found) {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: 'Error uploading file, try again later.',
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

export async function betaFindFilesUrlsByPostId (post: PostTest) {
  try {
    return post.filesId.map(fileId => {
      console.log('fileUrl :>> ', fileId)
      return storage.getFileView(appwriteConfig.storageId, fileId)
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
