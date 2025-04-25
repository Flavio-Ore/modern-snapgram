import { resetMessagesToRead } from '@/services/appwrite/chats/chatsMember'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
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
