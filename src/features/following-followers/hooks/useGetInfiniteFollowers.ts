import { findInfiniteFollowers } from '@/features/following-followers/services/findInfiniteFollowers'
import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/utils/constants'
import { enabledId } from '@/states/utils/enabledId'
import { getNextCursor } from '@/states/utils/getNextCursor'
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
