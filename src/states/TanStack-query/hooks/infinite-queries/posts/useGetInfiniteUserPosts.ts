
import { findInfinitePostsByUserId } from '@/services/appwrite/posts/findInfinitePostsByUserId'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/TanStack-query/utils/constants'
import { enabledId } from '@/states/TanStack-query/utils/enabledId'
import { getNextCursor } from '@/states/TanStack-query/utils/getNextCursor'
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
