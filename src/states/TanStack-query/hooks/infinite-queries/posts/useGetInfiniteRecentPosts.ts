
import { findInfiniteRecentPosts } from '@/services/appwrite/posts/findInfiniteRecentPosts'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/TanStack-query/utils/constants'
import { getNextCursor } from '@/states/TanStack-query/utils/getNextCursor'
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
