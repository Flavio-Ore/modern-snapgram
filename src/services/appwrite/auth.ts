import { account, appwriteConfig, avatars, databases } from '@/services/appwrite/config'
import { createUser } from '@/services/appwrite/users'
import type { INewUser, User } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'
import { APPWRITE_RESPONSE_CODES, type AppwriteResponse } from './util'

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
    return await createUser({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
    })
  } catch (error) {
    console.error({ error })
    if (error instanceof AppwriteException && error.code === 409) {
      error.message = 'This email address is not available. Choose a different address.'
      return error
    }
  }
}

// ============================== SIGN IN
export async function signInAccount (user: {
  email: string
  password: string
}) {
  try {
    return await account.createEmailSession(user.email, user.password)
  } catch (error) {
    console.error(error)
    if (error instanceof AppwriteException && error.code === 401 && error.type === 'user_invalid_credentials') return error
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
    const res: AppwriteResponse<typeof acc> = {
      code: APPWRITE_RESPONSE_CODES.OK.code,
      data: acc,
      message: 'Account retrieved successfully',
      status: APPWRITE_RESPONSE_CODES.OK.text
    }
    return res
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      if (e.code === 401 && e.type === 'user_not_found') {
        const res: AppwriteResponse<null> = {
          code: e.code,
          data: null,
          message: e.message,
          status: e.name
        }
        return res
      }
    }
    return null
  }
}

// ============================== GET USER
export async function getUser () {
  try {
    const sessionAccount = await account.get()
    console.log('currentAccount :>> ', sessionAccount)
    if (sessionAccount == null) return null
    const user = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', sessionAccount.$id)]
    )

    console.log('currentUserAccountData :>> ', user.documents[0])

    const res: AppwriteResponse<User> = {
      code: APPWRITE_RESPONSE_CODES.OK.code,
      data: user.documents[0],
      message: 'User retrieved successfully',
      status: APPWRITE_RESPONSE_CODES.OK.text
    }

    return res
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      if (e instanceof AppwriteException && e.code === 401 && e.type === 'user_not_found') {
        const res: AppwriteResponse<null> = {
          code: e.code,
          data: null,
          message: e.message,
          status: e.name
        }
        return res
      }
      if (e.code === 404) {
        const res: AppwriteResponse<null> = {
          code: e.code,
          data: null,
          message: e.message,
          status: e.name
        }
        return res
      }
    }
    return null
  }
}
