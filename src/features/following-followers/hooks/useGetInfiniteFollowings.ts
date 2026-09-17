import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { enabledId } from '@/states/enabledId'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findInfiniteFollowings } from '@following-followers/services/findInfiniteFollowings'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteFollowings = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWINGS, userId],
    queryFn: async ({ pageParam }) =>
      await findInfiniteFollowings({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
