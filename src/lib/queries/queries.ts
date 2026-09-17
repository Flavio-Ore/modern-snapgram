import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import {
  auth,
  chatRooms,
  chatsMember,
  posts,
  saves,
  users
} from '@/services/appwrite'
import { appwriteConfig, client } from '@/services/appwrite/config'
import { type MessageModel } from '@/types'
import { useQuery } from '@tanstack/react-query'

const enabledId = (id: string) => {
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}

// export const useMessagesNotifications = ({
//   currentUser
// }: {
//   currentUser: UserModel
// }) => {
//   const [payload, setPayload] = useState<{
//     numberOfMessages: number
//     showNotification: boolean
//     lastMessage?: MessageModel | null
//     chatsToRead: string[]
//   }>({
//     numberOfMessages: 0,
//     showNotification: false,
//     lastMessage: null,
//     chatsToRead: []
//   })
//   const reset = (reset = false) => {
//     if (reset) {
//       setPayload({
//         numberOfMessages: 0,
//         showNotification: false,
//         lastMessage: null,
//         chatsToRead: []
//       })
//     } else {
//       setPayload(prev => ({
//         ...prev,
//         showNotification: false
//       }))
//     }
//   }
//   useEffect(() => {
//     const unsubscribe = client.subscribe<MessageModel>(
//       [
//         `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`
//       ],
//       response => {
//         // This should be done by a backend instead of a client where anyone who has access to the client can listen to the messages by hacking the client
//         if (
//           currentUser?.accountId != null &&
//           response.payload.receivers.includes(currentUser?.accountId)
//         ) {
//           setPayload(prev => ({
//             ...prev,
//             showNotification: true,
//             lastMessage: response.payload,
//             chatsToRead: [
//               ...new Set([...prev.chatsToRead, response.payload.sender])
//             ]
//           }))
//           console.log('New message received:', response)
//         }
//         console.log({ messagesFullDuplex: response })
//       }
//     )

//     return () => {
//       unsubscribe()
//     }
//   }, [])

//   return useQuery({
//     queryKey: [
//       QUERY_KEYS.GET_MESSAGES_NOTIFICATIONS,
//       currentUser?.accountId,
//       payload
//     ],
//     queryFn: async () => payload,
//     placeholderData: { numberOfMessages: 0, showNotification: false }
//   })
// }

export const useSubscribeToMessages = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES_NOTIFICATIONS],
    queryFn: async () => {
      const unsubscribe = client.subscribe<MessageModel>(
        [
          `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messageCollectionId}.documents`
        ],
        response => {
          console.log({ messagesFullDuplex: response })
        }
      )

      return unsubscribe
    }
  })
}

export const useGetPostById = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: async () => await posts.findPostById(postId),
    select: response => response?.data ?? null,
    enabled: enabledId(postId)
  })
}

export const useGetSavedRecord = ({ recordId }: { recordId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_RECORD, recordId],
    queryFn: async () =>
      await saves.findSaveRecordById({ savedRecordId: recordId }),
    enabled: enabledId(recordId)
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: auth.getUser,
    select: response => response?.data ?? null
  })
}

export const useGetAllMemberChats = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_MEMBER_CHATS_BY_USER_ID, userId],
    queryFn: async () =>
      await chatsMember.findAllMemberChatsByUserId({
        userId: userId ?? ''
      }),
    enabled: enabledId(userId),
    select: response => response?.data
  })
}

export const useGetAllChatRoomsByUserId = ({
  userId
}: {
  userId: string
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CHATS_BY_USER_ID, userId],
    queryFn: async () =>
      await chatRooms.findAllChatRoomsByUserId({
        userId
      }),
    enabled: enabledId(userId),
    select: response => response?.data
  })
}

// export const useGetAllChatRoomsByMemberId = ({
//   memberChatId
// }: {
//   memberChatId: ChatMemberModel['$id']
// }) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_ALL_CHATS_BY_MEMBER_ID, memberChatId],
//     queryFn: async () =>
//       await chatRooms.findAllChatRoomsByMemberId({
//         memberId: memberChatId
//       }),
//     select: response => response?.data,
//     enabled: enabledId(memberChatId)
//   })
// }

// export const useGetChatRoomsByIds = ({ chatRoomIds }: { chatRoomIds: string[] }) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_CHAT_ROOMS_BY_IDS, ...chatRoomIds],
//     queryFn: async () =>
//       await chatRooms.findChatRoomsByIds({
//         chatRoomIds
//       }),
//     select: response => response?.data,
//     enabled: chatRoomIds.length > 0
//   })
// }

// export const useGetChatRoomById = ({ chatRoomId }: { chatRoomId: string }) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_CHAT_ROOM_BY_ID, chatRoomId],
//     queryFn: async () => await chatRooms.findChatRoomById({ chatRoomId }),
//     enabled: enabledId(chatRoomId),
//     select: response => response?.data
//   })
// }

export const useGetTopUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await users.findTopUsers({ limit }),
    select: response => response?.data,
    enabled: limit != null
  })
}

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => await users.findUserById({ userId }),
    select: response => response?.data,
    enabled: enabledId(userId)
  })
}
