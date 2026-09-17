import {
  appwriteConfig,
  databases
} from '@/services/appwrite/config'
import { type UserModel } from '@/types'
import { AppwriteException, ID } from 'appwrite'
import { appwriteResponse } from '../utils/appwriteResponse'

export async function createUser (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username: string
}) {
  try {
    return await databases.createDocument<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
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
