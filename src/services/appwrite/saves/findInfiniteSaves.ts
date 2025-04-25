import { appwriteConfig, databases } from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import { type Post, type Save, type SaveModel, type UserModel } from '@/types'
import { AppwriteException, type Models, Query } from 'appwrite'
import { getFilesWithUrlsByIds } from '../files/getFilesWithUrlsByIds'

interface InfiniteSavesParams {
  lastId: Models.Document['$id']
  userId: UserModel['$id']
}

export async function findInfiniteSaves ({
  lastId = '',
  userId
}: InfiniteSavesParams) {
  const query = [
    Query.equal('user', userId),
    Query.orderDesc('$createdAt'),
    Query.limit(2)
  ]
  if (lastId.trim().length !== 0) {
    query.push(Query.cursorAfter(lastId))
  }
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
    return appwriteResponse({
      data: saves,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}
