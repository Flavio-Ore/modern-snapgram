import {
  type Post,
  type PostModel
} from '@/types'
import { AppwriteException, Query } from 'appwrite'

import { appwriteConfig, databases } from '@/services/appwrite/config'

import { getFilesWithUrlsByIds } from '@/services/appwrite/files/getFilesWithUrlsByIds'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'

export async function findInfinitePosts ({
  lastId = '',
  query = []
}: {
  lastId: Post['$id']
  query: string[]
}) {
  const queries = [...query, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    queries.push(Query.cursorAfter(lastId))
  }
  try {
    const postsDocumentList = await databases.listDocuments<PostModel>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    )

    const data: Post[] = await Promise.all(
      postsDocumentList.documents.map(
        async ({ filesId, ...postWithoutFilesId }) => ({
          ...postWithoutFilesId,
          files: await getFilesWithUrlsByIds(filesId)
        })
      )
    )

    return appwriteResponse({
      data,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        code: e.code,
        message: e.message,
        status: e.type
      })
    }
    return null
  }
}
