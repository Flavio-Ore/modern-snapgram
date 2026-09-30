import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { useQuery } from '@tanstack/react-query'

export const useSessionUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SESSION_USER],
    queryFn: async () => await apiClient.auth.getCurrentUser(),
    select: response => response?.data ?? null
  })
}
