import { appwriteConfig, databases } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { type SaveModel } from '@/types'
import { AppwriteException, ID } from 'appwrite'

export async function updateSave ({
  postId,
  userId
}: {
  postId: string
  userId: string
}) {
  try {
    const saveRecord = await databases.createDocument<SaveModel>(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    return appwriteResponse({
      data: saveRecord,
      message: 'Post saved successfully.',
      status: APPWRITE_RESPONSE_CODES.CREATED.status,
      code: APPWRITE_RESPONSE_CODES.CREATED.code
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
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
