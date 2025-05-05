import { enabledId } from '@/states/enabledId'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findAllMemberChatsByUserId } from '@chats/services/chatsMember'
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
