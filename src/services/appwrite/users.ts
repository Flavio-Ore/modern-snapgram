import { appwriteConfig, databases } from '@/services/appwrite/config'
import { APPWRITE_RESPONSE_CODES, type AppwriteResponse, parseModel } from '@/services/appwrite/util'
import { type IUpdateUser, type User } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'
import { createFile, deleteFile, getFilePreview } from './file'

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
    const res: AppwriteResponse<User[]> = {
      data: users.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.text
    }
    return res
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      const res: AppwriteResponse<[]> = {
        data: [],
        message: e.message,
        code: e.code,
        status: e.name
      }
      return res
    }
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
    const res: AppwriteResponse<User[]> = {
      data: users.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.text
    }
    return res
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      const res: AppwriteResponse<[]> = {
        data: [],
        message: e.message,
        code: e.code,
        status: e.name
      }
      return res
    }
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
    const res: AppwriteResponse<User> = {
      data: user,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.text
    }
    return res
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      const res: AppwriteResponse<null> = {
        data: null,
        message: e.message,
        code: e.code,
        status: e.name
      }
      return res
    }
    return null
  }
}

// ============================== UPDATE USER
export async function updateUser ({ user }: { user: IUpdateUser }) {
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId
    }
    const hasFile = user.file.length > 0 && user.file[0]
    console.log({ hasFile })
    if (hasFile !== false) {
      const ava = await createFile(hasFile)

      if (ava?.$id == null && ava == null) {
        throw Error('File not uploaded')
      }

      const avaUrl = await getFilePreview(ava.$id)

      if (avaUrl == null || avaUrl.toString().trim().length === 0) {
        await deleteFile(ava.$id)
        throw Error('File not found')
      }

      image = {
        ...image,
        imageUrl: new URL(avaUrl),
        imageId: ava.$id
      }
    }

    const updatedUser = await databases.updateDocument<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId
      }
    )
    parseModel({ model: updatedUser, errorMsg: 'User not updated' })

    return updatedUser
  } catch (error) {
    console.error(error)
  }
}
