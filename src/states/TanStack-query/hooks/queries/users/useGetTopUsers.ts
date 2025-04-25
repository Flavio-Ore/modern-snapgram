import { findTopUsers } from '@/services/appwrite/users/findTopUsers'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useGetTopUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await findTopUsers({ limit }),
    select: response => response?.data,
    enabled: limit != null
  })
}
