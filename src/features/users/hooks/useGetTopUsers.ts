import { QUERY_KEYS } from '@/states/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { findTopUsers } from '@users/services/findTopUsers'

export const useGetTopUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await findTopUsers({ limit }),
    select: response => response?.data,
    enabled: limit != null
  })
}
