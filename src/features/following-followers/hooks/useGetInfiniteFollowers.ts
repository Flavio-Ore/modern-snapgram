import { findInfiniteFollowers } from '@/features/following-followers/services/findInfiniteFollowers'
import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { enabledId } from '@/states/enabledId'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteFollowers = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWERS, userId],
    queryFn: async ({ pageParam }) =>
      await findInfiniteFollowers({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
