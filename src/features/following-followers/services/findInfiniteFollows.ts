import { appwriteConfig, databases } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { type FollowingFollowersModel } from '@/types'
import { AppwriteException, Query } from 'appwrite'

export async function findInfiniteFollows ({
  lastId = '',
  query
}: {
  lastId: FollowingFollowersModel['$id']
  query: string[]
}) {
  const queries = [...query, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    queries.push(Query.cursorAfter(lastId))
  }
  try {
    const { documents: followsRecords } =
      await databases.listDocuments<FollowingFollowersModel>(
        appwriteConfig.databaseId,
        appwriteConfig.followersCollectionId,
        queries
      )
    return appwriteResponse({
      data: followsRecords,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      status: APPWRITE_RESPONSE_CODES.OK.status
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
