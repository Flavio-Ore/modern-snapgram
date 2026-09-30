import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { useQuery } from '@tanstack/react-query'

export const useGetAllMemberChats = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_MEMBER_CHATS_BY_USER_ID, userId],
    queryFn: async () => await apiClient.chats.getMemberChats(userId),
    enabled: Boolean(userId && userId.trim().length > 0),
    select: response => response?.data
  })
}
