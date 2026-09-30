import { createMessage } from '@chats/services/createMessage'
import { useMutation } from '@tanstack/react-query'

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: async ({
      body,
      authorAccountId,
      authorChat,
      receiversChat,
      chatRoomId
    }: Parameters<typeof createMessage>[0]) =>
      await createMessage({
        body,
        authorChat,
        receiversChat,
        authorAccountId,
        chatRoomId
      })
  })
}
