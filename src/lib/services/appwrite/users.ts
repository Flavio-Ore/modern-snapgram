import { type IUpdateUser, type User } from '@/types'
import { Models, Query } from 'appwrite'
import { appwriteConfig, databases } from './config'
import { parseModel } from './util'

export async function findInfiniteUsers ({
  lastId = '',
  queries = []
}: {
  lastId: string
  queries: string[]
}): Promise<Models.Document[]> {
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
export async function findAllUsers ({ limit }: { limit?: number }): Promise<User[]> {
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
    return users.documents
  } catch (error) {
    console.error(error)
    return []
  }
}

// ============================== GET USER BY ID
export async function findUserById ({ userId }: { userId: string }): Promise<User> {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    )
    parseModel({ model: user, errorMsg: 'User not found' })
    console.log('user :>> ', user)
    return user
  } catch (error) {
    console.error(error)
    return {}
  }
}

// ============================== UPDATE USER
export async function updateUser ({ user }: { user: IUpdateUser }): Promise<User> {
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
    return {}
  }
}
