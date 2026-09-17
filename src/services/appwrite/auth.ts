import { account, appwriteConfig, avatars, databases } from '@/services/appwrite/config'
import { createUser } from '@/services/appwrite/users'
import type { INewUser, User } from '@/types'
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
    if (error instanceof AppwriteException && error.code === 401) return error
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
    return await account.get()
  } catch (error) {
    console.error(error)
    if (error instanceof AppwriteException && error.code === 401) return null
  }
}

// ============================== GET USER
export async function getUser () {
  try {
    const currentAccount = await getAccount()
    console.log('currentAccount :>> ', currentAccount)
    if (currentAccount == null) throw new Error('No account found')

    const currentUser = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount?.$id ?? '')]
    )
    console.log('currentUserAccountData :>> ', currentUser.documents[0])
    return currentUser.documents[0] ?? {}
  } catch (error) {
    console.error(error)
  }
}

export async function anonymousSignIn () {
  try {
    return await account.createAnonymousSession()
  } catch (error) {
    console.error(error)
  }
}
