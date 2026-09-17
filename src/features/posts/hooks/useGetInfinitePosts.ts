
import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findInfiniteUpdatedPosts } from '@posts/services/findInfiniteUpdatedPosts'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useGetInfinitePosts () {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_UPDATED_POSTS],
    queryFn: async ({ pageParam }) =>
      await findInfiniteUpdatedPosts({
        lastId: pageParam
      }),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
