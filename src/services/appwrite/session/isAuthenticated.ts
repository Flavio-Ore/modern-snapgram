import {
  account
} from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import { AppwriteException } from 'appwrite'

export async function isAuthenticated () {
  if (window.localStorage.getItem('cookieFallback') === '[]' || window.localStorage.getItem('cookieFallback') == null) {
    return appwriteResponse({
      data: false,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'User not authenticated',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status
    })
  }

  try {
    await account.getSession('current')
    return appwriteResponse({
      data: true,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'session retrieved successfully',
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        code: e.code,
        data: null,
        message: e.message,
        status: e.type
      })
    }
    return null
  }
}
