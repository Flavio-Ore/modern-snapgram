import { INITIAL_PAGE_PARAM, enabledId, getNextCursor } from '@shared/lib'
import { QUERY_KEYS } from '@shared/config'
import { followApi } from '../api'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteFollowers = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWERS, userId],
    queryFn: async ({ pageParam }) =>
      await followApi.findInfiniteFollowers({
        lastId: pageParam as string,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
