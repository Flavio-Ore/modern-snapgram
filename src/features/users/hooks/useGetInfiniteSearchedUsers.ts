
import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/utils/constants'
import { enabledId } from '@/states/utils/enabledId'
import { getNextCursor } from '@/states/utils/getNextCursor'
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
