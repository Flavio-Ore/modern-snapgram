import {
  appwriteConfig,
  databases,
  storage
} from '@/services/appwrite/config'
import { deleteFile } from '@/services/appwrite/files/deleteFile'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_ERROR_TYPES } from '@/services/appwrite/utils/constants/APPWRITE_ERROR_TYPES'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import { type UserModel, type UserUpdateData } from '@/types'
import { AppwriteException, ID } from 'appwrite'

export async function updateUser ({ user }: { user: UserUpdateData }) {
  try {
    let newImage = {
      url: user.imageUrl,
      id: user.imageId
    }
    const hasFile = user.file.length > 0 && user.file[0]
    if (hasFile !== false) {
      const file = await storage.createFile(
        appwriteConfig.profileStorageId,
        ID.unique(),
        hasFile
      )
      const fileUrl = storage.getFilePreview(
        appwriteConfig.profileStorageId,
        file.$id
      )

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
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      if (e.type === APPWRITE_ERROR_TYPES.storage_file_type_unsupported) {
        return appwriteResponse({
          data: null,
          code: e.code,
          message: e.message,
          status: e.type
        })
      }
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
