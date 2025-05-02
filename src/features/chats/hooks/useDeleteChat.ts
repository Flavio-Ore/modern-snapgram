import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { deleteChat } from '@chats/services/chatsMember'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteChat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ chatId }: { chatId: string }) =>
      await deleteChat({ chatId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CHAT_ROOMS_BY_USER_ID]
      })
    }
  })
}
