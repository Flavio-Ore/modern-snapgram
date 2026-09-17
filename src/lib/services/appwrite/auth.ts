import { isObjectEmpty } from '@/lib/utils'
import type { INewUser, User } from '@/types'
import { ID, type Models, Query } from 'appwrite'
import { saveUserToDB } from './api'
import { account, appwriteConfig, avatars, databases } from './config'
import { parseModel } from './util'

// ============================================================
// AUTH
// ============================================================
export async function createUserAccount (user: INewUser): Promise<User> {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    if (isObjectEmpty(newAccount)) throw Error('Account not created')
    const avatarUrl = avatars.getInitials(user.name)
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
    })
    parseModel({ model: newUser, errorMsg: 'User not saved, try again' })
    return newUser
  } catch (error) {
    console.error(error)
    return {}
  }
}

// ============================== SIGN IN
export async function signInAccount (user: {
  email: string
  password: string
}): Promise<Models.Session | undefined> {
  try {
    const session = await account.createEmailSession(user.email, user.password)
    parseModel({ model: session, errorMsg: 'An error occurred' })
    return session
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET ACCOUNT
export async function getAccount (): Promise<
Models.User<Models.Preferences> | undefined
> {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error('An error occurred')
    return currentAccount
  } catch (error) {
    console.error(error)
  }
}

// ============================== SIGN OUT
export async function signOutAccount (): Promise<void> {
  try {
    await account.deleteSession('current')
  } catch (error) {
    console.error(error)
  }
}

// ============================== GET USER
export async function getCurrentSessionUser (): Promise<User | undefined> {
  try {
    const currentAccount = await getAccount()
    if (isObjectEmpty(currentAccount)) throw Error('An error occurred')
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if (isObjectEmpty(currentAccount)) throw Error('An error occurred')
    console.log('currentUser :>> ', currentUser.documents[0])
    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
  }
}
