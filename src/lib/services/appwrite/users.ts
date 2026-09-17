import { appwriteConfig, databases } from '@/lib/services/appwrite/config'
import { parseModel } from '@/lib/services/appwrite/util'
import { type IUpdateUser, type User } from '@/types'
import { ID, Query } from 'appwrite'

export async function createUser (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}) {
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
    return null
  }
}

export async function findInfiniteUsers ({
  lastId = '',
  queries = []
}: {
  lastId: string
  queries: string[]
}) {
  const query = [...queries, Query.limit(2)]
  if (lastId != null && lastId !== '') {
    query.push(Query.cursorAfter(lastId.toString()))
  }
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      query
    )
    parseModel({ model: users, errorMsg: 'No users found' })
    console.log('users :>> ', users.documents)
    return users.documents
  } catch (error) {
    console.error(error)
    return []
  }
}

// ============================== GET USERS
export async function findAllUsers ({ limit }: { limit?: number }) {
  const queries = [Query.orderDesc('$createdAt')]
  if (limit != null && limit > 0) queries.push(Query.limit(limit))
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    )
    parseModel({ model: users, errorMsg: 'No users found' })
    console.log('users :>> ', users)
    return users.documents as User[]
  } catch (error) {
    console.error(error)
    return []
  }
}

// ============================== GET USER BY ID
export async function findUserById ({ userId }: { userId: string }) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    )
    parseModel({ model: user, errorMsg: 'User not found' })
    console.log('user :>> ', user)
    return user as User
  } catch (error) {
    console.error(error)
    return null
  }
}

// ============================== UPDATE USER
export async function updateUser ({ user }: { user: IUpdateUser }) {
  try {
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        file: user.file,
        imageUrl: user.imageUrl
      }
    )
    parseModel({ model: updatedUser, errorMsg: 'User not updated' })
    return updatedUser
  } catch (error) {
    console.error(error)
  }
}
