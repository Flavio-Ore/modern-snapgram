import { findInfiniteMessages } from '@/services/appwrite/messages/findInfiniteMessages'
import {
  type ChatRoomModel,
  type MessageModel
} from '@/types'
import { Query } from 'appwrite'

export async function findInfiniteMessagesByChatRoomId ({
  lastId = '',
  chatRoomId
}: {
  lastId: MessageModel['$id']
  chatRoomId: ChatRoomModel['$id']
}) {
  return await findInfiniteMessages({
    lastId,
    query: [
      Query.equal('related_chat', chatRoomId),
      Query.orderDesc('$createdAt')
    ]
  })
}
