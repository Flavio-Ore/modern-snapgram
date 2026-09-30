import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { INITIAL_PAGE_PARAM, enabledId, getNextCursor } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteSavedPosts = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SAVED_POSTS, userId],
    queryFn: async ({ pageParam }) =>
      await apiClient.saves.getInfiniteSaves({
        lastId: pageParam as string,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
