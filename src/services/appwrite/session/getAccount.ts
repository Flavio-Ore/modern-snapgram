import {
  account
} from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_ERROR_TYPES } from '@/services/appwrite/utils/constants/APPWRITE_ERROR_TYPES'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import { AppwriteException } from 'appwrite'

export async function getAccount () {
  try {
    const acc = await account.get()
    return appwriteResponse({
      data: acc,
      message: 'Account retrieved successfully',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      if (e.code === 401 && e.type === APPWRITE_ERROR_TYPES.user_not_found) {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: e.message,
          status: e.type
        })
      }
    }
    return null
  }
}
