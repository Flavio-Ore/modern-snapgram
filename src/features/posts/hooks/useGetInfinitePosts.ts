
import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/utils/constants'
import { getNextCursor } from '@/states/utils/getNextCursor'
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
