import { QUERY_KEYS } from '@/states/queryKeys'
import { isAuthenticated } from '@auth/services/isAuthenticated'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.IS_AUTHENTICATED],
    queryFn: async () => await isAuthenticated()
  })
}
