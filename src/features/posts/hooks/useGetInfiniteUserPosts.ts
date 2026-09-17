
import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { enabledId } from '@/states/enabledId'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findInfinitePostsByUserId } from '@posts/services/findInfinitePostsByUserId'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteUserPosts = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USER_POSTS, userId],
    queryFn: async ({ pageParam }) =>
      await findInfinitePostsByUserId({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
