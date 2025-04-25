import { findInfiniteSaves } from '@/services/appwrite/saves/findInfiniteSaves'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/TanStack-query/utils/constants'
import { enabledId } from '@/states/TanStack-query/utils/enabledId'
import { getNextCursor } from '@/states/TanStack-query/utils/getNextCursor'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteSavedPosts = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SAVED_POSTS, userId],
    queryFn: async ({ pageParam }) =>
      await findInfiniteSaves({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
