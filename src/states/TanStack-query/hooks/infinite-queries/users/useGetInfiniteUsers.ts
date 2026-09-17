
import { findInfiniteRecentUsers } from '@/services/appwrite/users/findInfiniteRecentUsers'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/TanStack-query/utils/constants'
import { getNextCursor } from '@/states/TanStack-query/utils/getNextCursor'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USERS],
    queryFn: async ({ pageParam }) =>
      await findInfiniteRecentUsers({
        lastId: pageParam
      }),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
