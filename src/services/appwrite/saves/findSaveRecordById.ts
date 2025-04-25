import { appwriteConfig, databases } from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import { type Save, type SaveModel } from '@/types'
import { AppwriteException } from 'appwrite'

export async function findSaveRecordById ({ savedRecordId }: { savedRecordId: Save['$id'] }) {
  try {
    const saveRecord = await databases.getDocument<SaveModel>(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )
    return appwriteResponse({
      data: saveRecord,
      message: 'Saved post fetched successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
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
