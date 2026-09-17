import {
    account,
    appwriteConfig,
    avatars,
    databases
} from '@/services/appwrite/config'
import {
    APPWRITE_ERROR_TYPES,
    APPWRITE_RESPONSE_CODES,
    appwriteResponse
} from '@/services/appwrite/util'
import type { INewUser, UserModel } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

// ============================================================
// AUTH
// ============================================================
export async function createUserAccount (user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    const avatarUrl = avatars.getInitials(user.name)
    const newUser = await databases.createDocument<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl
      }
    )
    return appwriteResponse({
      data: newUser,
      message: 'Account created successfully',
      status: APPWRITE_RESPONSE_CODES.CREATED.status,
      code: APPWRITE_RESPONSE_CODES.CREATED.code
    })
  } catch (e) {
    console.error({ error: e })
    if (e instanceof AppwriteException) {
      if (e.code === 409) {
        return appwriteResponse({
          data: null,
          message:
            'This email address is not available. Choose a different address.',
          code: e.code,
          status: e.name
        })
      }
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

// ============================== SIGN IN
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
        code: e.code,
        data: null,
        message: e.message,
        status: e.name
      })
    }
    return null
  }
}

// ============================== SIGN OUT
export async function signOutAccount () {
  try {
    await account.deleteSession('current')
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET ACCOUNT
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
          code: e.code,
          data: null,
          message: e.message,
          status: e.name
        })
      }
    }
    return null
  }
}

// ============================== GET USER
export async function getUser () {
  try {
    const sessionAccount = await account.get()
    console.log('currentAccount :>> ', sessionAccount ?? '')
    const user = await databases.listDocuments<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [
        Query.equal('accountId', [sessionAccount.$id])
      ]
    )

    console.log('currentUserAccountData :>> ', user.documents[0] ?? 'NO USER DATA')

    return appwriteResponse({
      code: APPWRITE_RESPONSE_CODES.OK.code,
      data: user.documents[0],
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
          status: e.name
        })
      }
    }
    return null
  }
}
