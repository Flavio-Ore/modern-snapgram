import {
  account,
  appwriteConfig,
  databases
} from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_ERROR_TYPES } from '@/services/utils/constants/APPWRITE_ERROR_TYPES'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import type { UserModel } from '@/types'
import { AppwriteException, Query } from 'appwrite'

export async function getSessionUser () {
  try {
    const sessionAccount = await account.get()

    const user = await databases.listDocuments<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', [sessionAccount.$id])]
    )

    return appwriteResponse({
      data: user.documents[0],
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'User retrieved successfully',
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      if (e.code === 401 && e.type === APPWRITE_ERROR_TYPES.user_not_found) {
        return appwriteResponse({
          code: e.code,
          data: null,
          message: e.message,
          status: e.type
        })
      }
    }
    return null
  }
}
