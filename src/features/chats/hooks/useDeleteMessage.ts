import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { deleteMessage } from '@chats/services/deleteMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      messageId
    }: Parameters<typeof deleteMessage>[0]) =>
      await deleteMessage({ messageId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES_BY_CHAT_ROOM_ID]
      })
    }
  })
}
