import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { resetMessagesToRead } from '@chats/services/chatsMember'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSetMessagesReadToZero = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      chatId
    }: Parameters<typeof resetMessagesToRead>[0]) =>
      await resetMessagesToRead({ chatId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CHAT_ROOMS_BY_USER_ID]
      })
    }
  })
}
