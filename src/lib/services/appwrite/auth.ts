import { account, appwriteConfig, avatars, databases } from '@/lib/services/appwrite/config'
import { createUser } from '@/lib/services/appwrite/users'
import { parseModel } from '@/lib/services/appwrite/util'
import type { INewUser, User } from '@/types'
import { ID, type Models, Query } from 'appwrite'

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
    parseModel({ model: newAccount, errorMsg: 'Account not created' })
    const avatarUrl = avatars.getInitials(user.name)
    const newUser = await createUser({
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
    return null
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
export async function getAccount () {
  try {
    const currentAccount = await account.get()
    parseModel({ model: currentAccount, errorMsg: 'An error ocurred' })
    return currentAccount
  } catch (error) {
    console.error(error)
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

// ============================== GET USER
export async function getUser () {
  try {
    const currentAccount = await getAccount()
    parseModel({ model: currentAccount, errorMsg: 'An error occurred' })
    const currentUser = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount?.$id ?? '')]
    )
    parseModel({ model: currentUser, errorMsg: 'An error occurred' })
    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateAccount ({ name, email }: { name?: string, email?: string }) {
  try {
    if (name != null) await account.updateName(name)
  } catch (error) {
    console.error(error)
  }
}
