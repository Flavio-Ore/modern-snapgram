import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { INITIAL_PAGE_PARAM, getNextCursor } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS],
    queryFn: async ({ pageParam }) =>
      await apiClient.posts.getRecentPosts(pageParam as string),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
