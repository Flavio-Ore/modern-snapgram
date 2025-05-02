import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { editMessage } from '@chats/services/editMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useEditMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      messageId,
      newBody
    }: Parameters<typeof editMessage>[0]) =>
      await editMessage({ messageId, newBody }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES_BY_CHAT_ROOM_ID]
      })
    }
  })
}
