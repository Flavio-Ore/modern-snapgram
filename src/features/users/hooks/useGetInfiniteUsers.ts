
import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { findInfiniteRecentUsers } from '@users/services/findInfiniteRecentUsers'

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
