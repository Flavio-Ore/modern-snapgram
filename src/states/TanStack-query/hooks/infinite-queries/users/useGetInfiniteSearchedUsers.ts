
import { findInfiniteSearchedUsers } from '@/services/appwrite/users/findInfiniteSearchedUsers'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/TanStack-query/utils/constants'
import { enabledId } from '@/states/TanStack-query/utils/enabledId'
import { getNextCursor } from '@/states/TanStack-query/utils/getNextCursor'
import { useInfiniteQuery } from '@tanstack/react-query'

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
