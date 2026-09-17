
import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { enabledId } from '@/states/enabledId'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findInfiniteSearchedPosts } from '@posts/services/findInfiniteSearchedPosts'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteSearchedPosts = ({
  searchTerm
}: {
  searchTerm: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_POSTS, searchTerm],
    queryFn: async ({ pageParam }) =>
      await findInfiniteSearchedPosts({
        lastId: pageParam,
        searchTerm
      }),
    enabled: enabledId(searchTerm),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
