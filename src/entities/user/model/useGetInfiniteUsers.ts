import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { INITIAL_PAGE_PARAM, getNextCursor } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USERS],
    queryFn: async ({ pageParam }) =>
      await apiClient.users.getInfiniteUsers({
        lastId: pageParam as string
      }),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
