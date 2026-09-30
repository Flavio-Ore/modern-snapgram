import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { useQuery } from '@tanstack/react-query'

export const useGetTopUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await apiClient.users.getTopUsers(limit),
    select: response => response?.data,
    enabled: limit != null
  })
}
