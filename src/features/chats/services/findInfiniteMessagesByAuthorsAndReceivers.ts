import {
  type ChatMemberModel,
  type MessageModel
} from '@/types'
import { findInfiniteMessages } from '@chats/services/findInfiniteMessages'
import { Query } from 'appwrite'

export async function findInfiniteMessagesByAuthorsAndReceivers ({
  lastId = '',
  authorChatId,
  receiversChatId
}: {
  lastId: MessageModel['$id']
  authorChatId: ChatMemberModel['$id']
  receiversChatId: Array<ChatMemberModel['$id']>
}) {
  return await findInfiniteMessages({
    lastId,
    query: [
      Query.or([
        Query.and([
          Query.contains('author_chat_id', [authorChatId]),
          Query.contains('receivers_chat_id', receiversChatId)
        ]),
        Query.and([
          Query.contains('author_chat_id', receiversChatId),
          Query.contains('receivers_chat_id', [authorChatId])
        ])
      ]),
      Query.orderDesc('$createdAt'),
      Query.limit(10)
    ]
  })
}
