import { type INewPost, type IUpdatePost, type Post } from '@/types'
import { ID, type Models, Query } from 'appwrite'

import { isObjectEmpty } from '@/lib/utils'
import { appwriteConfig, databases } from './config'
import { deleteFile, getFilePreview, uploadFile } from './file'
import { parseModel } from './util'

// ============================================================
// POSTS
// ============================================================
export async function findInfinitePosts ({
  lastId = '',
  queries = []
}: {
  lastId: string
  queries: string[]
}): Promise<Models.Document[]> {
  const query = [...queries, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    query.push(Query.cursorAfter(lastId.toString()))
  }
  try {
    const postsDocumentList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      query
    )
    parseModel({ model: postsDocumentList, errorMsg: 'No posts found' })
    return postsDocumentList.documents
  } catch (error) {
    console.error(error)
    return []
  }
}
// ============================== CREATE POST
export async function createPost (post: INewPost) {
  try {
    let tags
    const uploadedFile = await uploadFile(post.file[0])
    parseModel({ model: uploadedFile, errorMsg: 'File not uploaded' })

    const fileUrl = await getFilePreview(uploadedFile.$id)
    if (fileUrl != null && fileUrl !== '') {
      await deleteFile(uploadedFile.$id)
      throw Error('File not found')
    }
    if (post.tags == null) tags = []
    tags = post.tags?.replace(/ /g, '').split(',')

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        location: post.location,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        tags
      }
    )
    if (isObjectEmpty(newPost)) {
      await deleteFile(uploadedFile.$id)
      throw Error('Post not saved, try again')
    }
    return newPost
  } catch (error) {
    console.error(error)
  }
}
// ============================== GET POST BY ID
export async function findPostById (postId: string) {
  try {
    const postDocument = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )
    parseModel({ model: postDocument, errorMsg: 'Post not found' })
    const post: Post = postDocument
    return post
  } catch (error) {
    console.error(error)
  }
}

// ============================== UPDATE POST
export async function updatePost (post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0

  try {
    let tags
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    }

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0])
      parseModel({ model: uploadedFile, errorMsg: 'File not uploaded' })

      // Get new file url
      const fileUrl = await getFilePreview(uploadedFile.$id)
      if (fileUrl == null || fileUrl.toString().trim().length === 0) {
        await deleteFile(uploadedFile.$id)
        throw Error('File not found')
      }

      image = {
        ...image,
        imageUrl: new URL(fileUrl),
        imageId: uploadedFile.$id
      }
    }

    // Convert tags into array
    if (post.tags == null) tags = []
    tags = post.tags?.replace(/ /g, '').split(',')

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags
      }
    )

    // Failed to update
    if (isObjectEmpty(updatedPost)) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) await deleteFile(image.imageId)
      // If no new file uploaded, just throw error
      throw Error('Post not updated, try again')
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) await deleteFile(post.imageId)

    return updatedPost
  } catch (error) {
    console.error(error)
  }
}

// ============================== DELETE POST
export async function deletePost ({
  postId,
  imageId
}: {
  postId: string
  imageId: string
}): Promise<{ status: string }> {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )
    console.log('statusCode :>> ', statusCode)
    await deleteFile(imageId)
    return { status: 'success' }
  } catch (error) {
    console.error(error)
    return { status: 'error' }
  }
}
