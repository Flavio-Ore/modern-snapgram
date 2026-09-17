import { type EmptyObject } from '@/types'
import { ID, type Models } from 'appwrite'
import { account, appwriteConfig, databases } from './config'
import { parseModel } from './util'

export async function saveUserToDB (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}): Promise<Models.Document | EmptyObject> {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
    parseModel({ model: newUser, errorMsg: 'User not saved, try again' })
    return newUser
  } catch (error) {
    console.error(error)
    return {}
  }
}

export async function getAccount (): Promise<
Models.User<Models.Preferences> | EmptyObject
> {
  try {
    const currentAccount = await account.get()
    parseModel({ model: currentAccount, errorMsg: 'An error ocurred' })
    return currentAccount
  } catch (error) {
    console.error(error)
    return {}
  }
}
