import {
  type DeletePostParams,
  type NewPostData,
  type Post,
  type PostModel,
  type UpdatedPostData
} from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

import { appwriteConfig, databases } from '@/services/appwrite/config'
import {
  createFiles,
  deleteManyFilesByIds,
  getFilesWithUrlsByIds
} from '@/services/appwrite/file'
import {
  APPWRITE_ERROR_TYPES,
  APPWRITE_RESPONSE_CODES,
  appwriteResponse,
  tagsToArray
} from '@/services/appwrite/util'

export async function findInfinitePostsByUserId ({
  lastId = '',
  userId
}: {
  lastId: Post['$id']
  userId?: string
}) {
  if (userId == null || userId.trim().length === 0) return null
  return await findInfinitePosts({
    lastId,
    query: [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
  })
}

export async function findInfiniteSearchedPosts ({
  lastId = '',
  searchTerm = ''
}: {
  lastId: Post['$id']
  searchTerm: string
}) {
  return await findInfinitePosts({
    lastId,
    query: [Query.search('caption', searchTerm), Query.orderDesc('$createdAt')]
  })
}

export async function findInfiniteRecentPosts ({ lastId = '' }) {
  return await findInfinitePosts({
    lastId,
    query: [Query.orderDesc('$createdAt')]
  })
}

export async function findInfiniteUpdatedPosts ({ lastId = '' }) {
  return await findInfinitePosts({
    lastId,
    query: [Query.orderDesc('$updatedAt')]
  })
}

export async function findInfinitePosts ({
  lastId = '',
  query = []
}: {
  lastId: Post['$id']
  query: string[]
}) {
  const queries = [...query, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    queries.push(Query.cursorAfter(lastId))
  }
  try {
    const postsDocumentList = await databases.listDocuments<PostModel>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    )

    const data: Post[] = await Promise.all(
      postsDocumentList.documents.map(
        async ({ filesId, ...postWithoutFilesId }) => ({
          ...postWithoutFilesId,
          files: await getFilesWithUrlsByIds(filesId)
        })
      )
    )

    return appwriteResponse({
      data,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        code: e.code,
        message: e.message,
        status: e.type
      })
    }
    return null
  }
}

// ============================== GET POST BY ID
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

// ============================== CREATE POST
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

// ============================== UPDATE POST
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

// ============================== DELETE POST
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
