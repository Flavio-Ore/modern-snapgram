import { ID, Models, Query } from 'appwrite'
import { appwriteConfig, databases } from './config'
import { parseModel } from './util'
interface DeleteSavedPost {
  savedRecordId: string
}
export async function findSave ({ userId }: { userId: string }) {
  try {
    const saves = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      [Query.equal('user', userId), Query.cursorAfter('65fe081ac1d03e2c241c')]
    )
    if (!saves) throw Error
    console.log('savedPosts: ', saves)
    return saves.documents || []
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function updateSave ({
  postId,
  userId
}: {
  postId: string
  userId: string
}) {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    if (!savedPost) throw Error
    return savedPost
  } catch (error) {
    console.error(error)
  }
}

// ============================== DELETE SAVED POST
export async function deleteSaves ({
  savedRecordId
}: DeleteSavedPost): Promise<{ status: string }> {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
    console.log('statusCode :>> ', statusCode)
    if (statusCode == null) throw Error('An error occurred')
    return {
      status: 'success'
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'error'
    }
  }
}

interface InfiniteSavesParams {
  lastId: string
  queries: string[]
}
export async function findInfiniteSaves ({
  lastId = '',
  queries = []
}: InfiniteSavesParams): Promise<Models.Document[]> {
  const query = [...queries, Query.limit(2)]
  if (lastId.trim().length !== 0)
    query.push(Query.cursorAfter(lastId.toString()))
  console.log('query :>> ', query)
  try {
    const saves = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      query
    )
    parseModel({ model: saves, errorMsg: 'An error occurred' })
    console.log('savedPosts: ', saves)
    return saves.documents
  } catch (error) {
    console.error(error)
    return []
  }
}
