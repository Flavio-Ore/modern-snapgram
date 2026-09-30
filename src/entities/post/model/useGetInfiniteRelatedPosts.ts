import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { INITIAL_PAGE_PARAM, enabledId, getNextCursor } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Query } from 'appwrite'

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
      await apiClient.posts.getInfinitePosts({
        lastId: pageParam as string,
        query: [
          Query.equal('creator', userId),
          Query.notEqual('$id', postId),
          Query.orderDesc('$createdAt')
        ]
      }),
    enabled: enabledId(postId) && enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
