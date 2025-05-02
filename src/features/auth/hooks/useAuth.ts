import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { isAuthenticated } from '@auth/services/isAuthenticated'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.IS_AUTHENTICATED],
    queryFn: isAuthenticated
  })
}
