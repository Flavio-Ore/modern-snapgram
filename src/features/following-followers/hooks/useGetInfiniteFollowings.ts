import { findInfiniteFollowings } from '@/features/following-followers/services/findInfiniteFollowings'
import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/utils/constants'
import { enabledId } from '@/states/utils/enabledId'
import { getNextCursor } from '@/states/utils/getNextCursor'
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
