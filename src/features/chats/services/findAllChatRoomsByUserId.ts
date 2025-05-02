import { appwriteConfig, databases } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type ChatRoomModel
} from '@/types'
import { AppwriteException, Query } from 'appwrite'

export async function findAllChatRoomsByUserId ({
  chatRoomsIds
}: {
  chatRoomsIds: Array<ChatRoomModel['$id']>
}) {
  try {
    if (chatRoomsIds.length <= 0) {
      return appwriteResponse({
        data: [],
        message: 'Chat rooms found successfully.',
        status: APPWRITE_RESPONSE_CODES.OK.status,
        code: APPWRITE_RESPONSE_CODES.OK.code
      })
    }
    const chatRooms = await databases.listDocuments<ChatRoomModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      [Query.equal('$id', chatRoomsIds)]
    )
    return appwriteResponse({
      data: chatRooms.documents,
      message: 'Chat rooms found successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
    console.error({ e })
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
