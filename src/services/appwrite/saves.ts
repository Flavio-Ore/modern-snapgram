import { appwriteConfig, databases } from '@/services/appwrite/config'
import { getFilesWithUrlsByIds } from '@/services/appwrite/file'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import { type Post, type Save, type SaveModel } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'
interface SavesId {
  savedRecordId: string
}

export async function findSaveRecordById ({ savedRecordId }: SavesId) {
  try {
    const saveRecord = await databases.getDocument<SaveModel>(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
    return appwriteResponse({
      data: saveRecord,
      message: 'Saved post fetched successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.text,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
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
    const saveRecord = await databases.createDocument<SaveModel>(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    console.log('saveRecord :>> ', saveRecord)
    return appwriteResponse({
      data: saveRecord,
      message: 'Post saved successfully.',
      status: APPWRITE_RESPONSE_CODES.CREATED.text,
      code: APPWRITE_RESPONSE_CODES.CREATED.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
  }
}

// ============================== DELETE SAVED POST
export async function deleteSave ({ savedRecordId }: SavesId) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
    return appwriteResponse({
      data: null,
      message: 'Saved post removed successfully.',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.text,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
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
    const { documents: savesDocuments } =
      await databases.listDocuments<SaveModel>(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        query
      )

    const rawPosts = savesDocuments.map(record => record.post)
    const posts: Post[] = await Promise.all(
      rawPosts.map(async rawPost => {
        const { filesId, ...postWithoutFilesId } = rawPost
        return {
          ...postWithoutFilesId,
          files: await getFilesWithUrlsByIds(filesId)
        }
      })
    )

    const saves: Save[] = posts.map((post, index) => ({
      ...savesDocuments[index],
      post
    }))

    console.log('savesDocumentList: ', savesDocuments)
    return appwriteResponse({
      data: saves,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.text,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
  }
}
