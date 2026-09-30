import {
  account,
  appwriteConfig,
  avatars,
  databases
} from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import type { INewUser, UserModel } from '@/types'
import { AppwriteException, ID } from 'appwrite'

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    const avatarUrl = avatars.getInitials(user.name)

    await account.createEmailPasswordSession(
      user.email,
      user.password
    )

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
          status: e.type
        })
      }
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}
