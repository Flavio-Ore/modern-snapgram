import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { INITIAL_PAGE_PARAM, enabledId, getNextCursor } from '@shared/lib'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteMessagesByChatRoomId = ({
  chatRoomId
}: {
  chatRoomId: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES_BY_CHAT_ROOM_ID, chatRoomId],
    queryFn: async ({ pageParam }) =>
      await apiClient.chats.getMessages(chatRoomId, pageParam as string),
    enabled: enabledId(chatRoomId),
    select: infiniteData => {
      const responsesInDisarray = infiniteData.pages.map(response => {
        if (response?.data == null) {
          return response
        }
        const messagesInDisorder = structuredClone(response.data)
        return {
          ...response,
          data: messagesInDisorder.reverse()
        }
      })
      return {
        pages: responsesInDisarray.reverse(),
        pageParams: infiniteData.pageParams
      }
    },
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
