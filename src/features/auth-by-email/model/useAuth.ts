import { QUERY_KEYS } from '@shared/config'
import { useQuery } from '@tanstack/react-query'
import { isAuthenticated } from '../api/isAuthenticated'

export const useAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.IS_AUTHENTICATED],
    queryFn: async () => await isAuthenticated()
  })
}
