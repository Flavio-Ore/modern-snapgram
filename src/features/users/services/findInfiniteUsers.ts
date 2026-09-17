import {
  appwriteConfig,
  databases
} from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { type UserModel } from '@/types'
import { AppwriteException, Query } from 'appwrite'

export async function findInfiniteUsers ({
  lastId = '',
  query = []
}: {
  lastId: UserModel['$id']
  query?: string[]
}) {
  const queries = [...query, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    queries.push(Query.cursorAfter(lastId.toString()))
  }
  try {
    const users = await databases.listDocuments<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    )
    return appwriteResponse({
      data: users.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
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
