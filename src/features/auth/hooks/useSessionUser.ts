import { QUERY_KEYS } from '@/states/queryKeys'
import { getSessionUser } from '@auth/services/getSessionUser'
import { useQuery } from '@tanstack/react-query'

export const useSessionUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SESSION_USER],
    queryFn: getSessionUser,
    select: response => response?.data ?? null
  })
}
