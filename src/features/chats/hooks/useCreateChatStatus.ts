import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { createChat } from '@chats/services/chatsMember'
import { useMutation, useQueryClient } from '@tanstack/react-query'
export const useCreateChatStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) =>
      await createChat({ userId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CHAT_ROOMS_BY_USER_ID]
      })
    }
  })
}
