import { appwriteConfig, databases } from '@/services/appwrite/config'
import { parseModel } from '@/services/appwrite/util'
import { type User } from '@/types'
import { ID, Query } from 'appwrite'

export async function createUser (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username: string
}) {
  try {
    return await databases.createDocument<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
  } catch (error) {
    console.error({ error })
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
    const users = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      query
    )
    parseModel({ model: users, errorMsg: 'No users found' })
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
    const users = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    )
    parseModel({ model: users, errorMsg: 'No users found' })
    return users.documents
  } catch (error) {
    console.error(error)
    return []
  }
}

// ============================== GET USER BY ID
export async function findUserById ({ userId }: { userId: string }) {
  try {
    const user = await databases.getDocument<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    )
    parseModel({ model: user, errorMsg: 'User not found' })
    return user
  } catch (error) {
    console.error(error)
  }
}

// ============================== UPDATE USER
// export async function updateUser ({ user }: { user: IUpdateUser }) {
//   try {
//     let image = {
//       imageUrl: user.imageUrl,
//       imageId: user.imageId
//     }
//     const hasFile = user.file.length > 0 && user.file[0]
//     console.log({ hasFile })
//     if (hasFile !== false) {
//       const ava = await createFile(hasFile)

//       if (ava?.$id == null && ava == null) {
//         throw Error('File not uploaded')
//       }

//       const avaUrl = await getFilePreview(ava.$id)

//       if (avaUrl == null || avaUrl.toString().trim().length === 0) {
//         await deleteFile(ava.$id)
//         throw Error('File not found')
//       }

//       image = {
//         ...image,
//         imageUrl: new URL(avaUrl),
//         imageId: ava.$id
//       }
//     }

//     const updatedUser = await databases.updateDocument<User>(
//       appwriteConfig.databaseId,
//       appwriteConfig.usersCollectionId,
//       user.userId,
//       {
//         name: user.name,
//         bio: user.bio,
//         imageUrl: image.imageUrl,
//         imageId: image.imageId
//       }
//     )
//     parseModel({ model: updatedUser, errorMsg: 'User not updated' })

//     await updateAccount({ name: user.name })
//     return updatedUser
//   } catch (error) {
//     console.error(error)
//   }
// }
