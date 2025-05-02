import {
  account
} from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_ERROR_TYPES } from '@/services/utils/constants/APPWRITE_ERROR_TYPES'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { AppwriteException } from 'appwrite'
export async function signInAccount (user: { email: string, password: string }) {
  try {
    return appwriteResponse({
      data: await account.createEmailPasswordSession(user.email, user.password),
      message: 'Account signed in successfully',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error(e)
    if (
      e instanceof AppwriteException &&
      e.code === 401 &&
      e.type === APPWRITE_ERROR_TYPES.user_invalid_credentials
    ) {
      return appwriteResponse({
        data: null,
        code: e.code,
        message: e.message,
        status: e.type
      })
    }
    return null
  }
}
