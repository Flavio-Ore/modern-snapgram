import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { INITIAL_PAGE_PARAM, enabledId, getNextCursor } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Query } from 'appwrite'

export const useGetInfiniteSearchedPosts = ({
  searchTerm
}: {
  searchTerm: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_POSTS, searchTerm],
    queryFn: async ({ pageParam }) =>
      await apiClient.posts.getInfinitePosts({
        lastId: pageParam as string,
        query: [Query.search('caption', searchTerm), Query.orderDesc('$createdAt')]
      }),
    enabled: enabledId(searchTerm),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
