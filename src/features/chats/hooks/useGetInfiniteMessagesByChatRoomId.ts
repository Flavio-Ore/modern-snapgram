import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { INITIAL_PAGE_PARAM } from '@/states/utils/constants'
import { enabledId } from '@/states/utils/enabledId'
import { getNextCursor } from '@/states/utils/getNextCursor'
import { findInfiniteMessagesByChatRoomId } from '@chats/services/findInfiniteMessagesByChatRoomId'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteMessagesByChatRoomId = ({
  chatRoomId
}: {
  chatRoomId: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES_BY_CHAT_ROOM_ID, chatRoomId],
    queryFn: async ({ pageParam }) =>
      await findInfiniteMessagesByChatRoomId({
        lastId: pageParam,
        chatRoomId
      }),
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
