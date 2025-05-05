
import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { enabledId } from '@/states/enabledId'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findInfiniteRelatedPostsByUserIdAndPostIdToExclude } from '@posts/services/findInfiniteRelatedPostsByUserIdAndPostIdToExclude'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteRelatedPosts = ({
  postId,
  userId
}: {
  postId: string
  userId: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_RELATED_POSTS, postId, userId],
    queryFn: async ({ pageParam }) =>
      await findInfiniteRelatedPostsByUserIdAndPostIdToExclude({
        lastId: pageParam,
        postId,
        userId
      }),
    enabled: enabledId(postId) && enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
