import { appwriteConfig, databases } from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type MessageModel
} from '@/types'
import { AppwriteException, Query } from 'appwrite'

export async function findInfiniteMessages ({
  lastId = '',
  query = []
}: {
  lastId: MessageModel['$id']
  query: string[]
}) {
  const queries = [...query, Query.limit(10)]
  try {
    if (lastId.trim().length !== 0) {
      queries.push(Query.cursorAfter(lastId))
    }

    const messagesDocumentList = await databases.listDocuments<MessageModel>(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      queries
    )

    return appwriteResponse({
      data: messagesDocumentList.documents,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ error: e })
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}
