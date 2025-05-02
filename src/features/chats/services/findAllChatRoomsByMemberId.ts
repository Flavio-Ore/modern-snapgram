import { appwriteConfig, databases } from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import {
  type ChatMemberModel,
  type ChatRoomModel
} from '@/types'
import { AppwriteException, Query } from 'appwrite'

export async function findAllChatRoomsByMemberId ({
  memberId
}: {
  memberId: ChatMemberModel['$id']
}) {
  try {
    const query = [Query.equal('members', [memberId])]
    const chatRooms = await databases.listDocuments<ChatRoomModel>(
      appwriteConfig.databaseId,
      appwriteConfig.chatRoomCollectionId,
      query
    )

    return appwriteResponse({
      data: chatRooms,
      message: 'Chat rooms found successfully.',
      status: APPWRITE_RESPONSE_CODES.OK.status,
      code: APPWRITE_RESPONSE_CODES.OK.code
    })
  } catch (e) {
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
