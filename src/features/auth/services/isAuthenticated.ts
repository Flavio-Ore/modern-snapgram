import {
  account
} from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { AppwriteException } from 'appwrite'

export async function isAuthenticated () {
  console.log({
    localStorage: window.localStorage.getItem('cookieFallback')
  })
  if (window.localStorage.getItem('cookieFallback') == null) {
    return appwriteResponse({
      data: false,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'User not authenticated',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status
    })
  }

  try {
    const session = await account.get()
    return appwriteResponse({
      data: session != null,
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
