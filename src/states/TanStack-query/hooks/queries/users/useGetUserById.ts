import { findUserById } from '@/services/appwrite/users/findUserById'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { enabledId } from '@/states/TanStack-query/utils/enabledId'
import { useQuery } from '@tanstack/react-query'

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => await findUserById({ userId }),
    select: response => response?.data,
    enabled: enabledId(userId)
  })
}
