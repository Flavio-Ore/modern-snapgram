import { findAllMemberChatsByUserId } from '@/services/appwrite/chats/chatsMember'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { enabledId } from '@/states/TanStack-query/utils/enabledId'
import { useQuery } from '@tanstack/react-query'

export const useGetAllMemberChats = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_MEMBER_CHATS_BY_USER_ID, userId],
    queryFn: async () =>
      await findAllMemberChatsByUserId({
        userId: userId ?? ''
      }),
    enabled: enabledId(userId),
    select: response => response?.data
  })
}
