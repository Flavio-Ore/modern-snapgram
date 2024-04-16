import { appwriteConfig, databases } from '@/services/appwrite/config'
import { parseModel } from '@/services/appwrite/util'
import { type Save } from '@/types'
import { ID, Query } from 'appwrite'
interface SavesId {
  savedRecordId: string
}

export async function findSaveRecordById ({ savedRecordId }: SavesId) {
  try {
    const saveRecord = await databases.getDocument<Save>(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
    parseModel({ model: saveRecord, errorMsg: 'Error getting the record' })
    return saveRecord
  } catch (error) {
    console.error(error)
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
    const saveRecord = await databases.createDocument<Save>(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    console.log('saveRecord :>> ', saveRecord)
    parseModel({ model: saveRecord, errorMsg: 'An error occurred' })
    return saveRecord
  } catch (error) {
    console.error(error)
  }
}

// ============================== DELETE SAVED POST
export async function deleteSave ({
  savedRecordId
}: SavesId): Promise<{ status: string }> {
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
