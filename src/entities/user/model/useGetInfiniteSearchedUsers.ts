import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { INITIAL_PAGE_PARAM, enabledId, getNextCursor } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteSearchedUsers = ({
  searchTerm
}: {
  searchTerm: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_USERS, searchTerm],
    queryFn: async ({ pageParam }) =>
      await apiClient.users.getInfiniteUsers({
        lastId: pageParam as string,
        query: [searchTerm]
      }),
    enabled: enabledId(searchTerm),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
