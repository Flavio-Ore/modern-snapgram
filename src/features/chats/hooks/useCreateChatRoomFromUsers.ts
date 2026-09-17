import { createChatRoomFromUsers } from '@chats/services/createChatRoomFromUsers'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateChatRoomFromUsers = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      users
    }: Parameters<typeof createChatRoomFromUsers>[0]) =>
      await createChatRoomFromUsers({ users }),
    onSuccess: response => {
      if (response?.data == null) {
        return
      }
      void queryClient.refetchQueries()
    }
  })
}
