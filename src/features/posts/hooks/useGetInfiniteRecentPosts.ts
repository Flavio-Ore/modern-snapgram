
import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/utils/constants'
import { getNextCursor } from '@/states/utils/getNextCursor'
import { findInfiniteRecentPosts } from '@posts/services/findInfiniteRecentPosts'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS],
    queryFn: async ({ pageParam }) =>
      await findInfiniteRecentPosts({
        lastId: pageParam
      }),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
