import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { enabledId } from '@shared/lib'
import { useQuery } from '@tanstack/react-query'

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => await apiClient.users.getById(userId),
    select: response => response?.data,
    enabled: enabledId(userId)
  })
}
