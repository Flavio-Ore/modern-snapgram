import { isAuthenticated } from '@/services/appwrite/session/isAuthenticated'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.IS_AUTHENTICATED],
    queryFn: isAuthenticated
  })
}
