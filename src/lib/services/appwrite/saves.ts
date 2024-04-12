import { appwriteConfig, databases } from '@/lib/services/appwrite/config'
import { parseModel } from '@/lib/services/appwrite/util'
import { type Post, type Save } from '@/types'
import { ID, Query } from 'appwrite'
interface DeleteSavedPost {
  savedRecordId: string
}

export async function updateSave ({
  postId,
  userId
}: {
  postId: string
  userId: string
}) {
  try {
    const savedPost = await databases.createDocument<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    parseModel({ model: savedPost, errorMsg: 'An error occurred' })
    return savedPost
  } catch (error) {
    console.error(error)
  }
}

// ============================== DELETE SAVED POST
export async function deleteSave ({
  savedRecordId
}: DeleteSavedPost): Promise<{ status: string }> {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
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
}: InfiniteSavesParams) {
  const query = [...queries, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    query.push(Query.cursorAfter(lastId))
  }
  console.log('query :>> ', query)
  try {
    const saves = await databases.listDocuments<Save>(
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
