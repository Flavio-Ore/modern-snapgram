
import { INITIAL_PAGE_PARAM } from '@/states/constants'
import { enabledId } from '@/states/enabledId'
import { getNextCursor } from '@/states/getNextCursor'
import { QUERY_KEYS } from '@/states/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { findInfiniteSearchedUsers } from '@users/services/findInfiniteSearchedUsers'

export const useGetInfiniteSearchedUsers = ({
  searchTerm
}: {
  searchTerm: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_USERS, searchTerm],
    queryFn: async ({ pageParam }) =>
      await findInfiniteSearchedUsers({
        lastId: pageParam,
        searchTerm
      }),
    enabled: enabledId(searchTerm),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
