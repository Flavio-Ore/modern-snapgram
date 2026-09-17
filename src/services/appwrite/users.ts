import { appwriteConfig, databases, storage } from '@/services/appwrite/config'
import { deleteFile } from '@/services/appwrite/file'
import {
  APPWRITE_ERROR_TYPES,
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import { type UserModel, type UserUpdateData } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

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
        status: e.name
      })
    }
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
    const users = await databases.listDocuments<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      query
    )
    return appwriteResponse({
      data: users.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.text
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
  }
}

// ============================== GET USERS
export async function findAllUsers ({ limit }: { limit?: number }) {
  const queries = [Query.orderDesc('$createdAt')]
  if (limit != null && limit > 0) queries.push(Query.limit(limit))
  try {
    const users = await databases.listDocuments<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    )
    return appwriteResponse({
      data: users.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.text
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
  }
}

// ============================== GET USER BY ID
export async function findUserById ({ userId }: { userId: string }) {
  try {
    const user = await databases.getDocument<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    )
    return appwriteResponse({
      data: user,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.text
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
  }
}

// ============================== UPDATE USER
export async function updateUser ({ user }: { user: UserUpdateData }) {
  try {
    let newImage = {
      url: user.imageUrl,
      id: user.imageId
    }
    const hasFile = user.file.length > 0 && user.file[0]
    console.log({ user })
    if (hasFile !== false) {
      const file = await storage.createFile(
        appwriteConfig.profileStorageId,
        ID.unique(),
        hasFile
      )
      const fileUrl = storage.getFilePreview(appwriteConfig.profileStorageId, file.$id)

      if (fileUrl == null) {
        await deleteFile(file.$id)
      } else {
        newImage = {
          ...newImage,
          url: new URL(fileUrl),
          id: file.$id
        }
      }
    }

    const updatedUser = await databases.updateDocument<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: newImage.url,
        imageId: newImage.id
      }
    )

    return appwriteResponse({
      data: updatedUser,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: 'Account updated successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.text
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      if (e.type === APPWRITE_ERROR_TYPES.storage_file_type_unsupported) {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: e.message,
          status: e.name
        })
      }
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.name
      })
    }
    return null
  }
}
