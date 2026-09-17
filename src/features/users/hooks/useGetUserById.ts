import { enabledId } from '@/states/enabledId'
import { QUERY_KEYS } from '@/states/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { findUserById } from '@users/services/findUserById'

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => await findUserById({ userId }),
    select: response => response?.data,
    enabled: enabledId(userId)
  })
}
