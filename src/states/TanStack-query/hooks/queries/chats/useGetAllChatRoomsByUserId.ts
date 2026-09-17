import { findAllChatRoomsByUserId } from '@/services/appwrite/chats/findAllChatRoomsByUserId'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { useQuery } from '@tanstack/react-query'


export const useGetAllChatRoomsByUserId = ({
  chatRoomsIds
}: {
  chatRoomsIds: string[]
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CHAT_ROOMS_BY_USER_ID, ...chatRoomsIds],
    queryFn: async () =>
      await findAllChatRoomsByUserId({
        chatRoomsIds
      }),
    enabled: chatRoomsIds.length > 0,
    select: response => response?.data
  })
}
