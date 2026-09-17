import { updateChatMemberOnlineStatus } from '@chats/services/chatsMember'
import { useMutation } from '@tanstack/react-query'

export const useSetChatMemberOnline = () => {
  return useMutation({
    mutationFn: async ({
      chatIds,
      online
    }: Parameters<typeof updateChatMemberOnlineStatus>[0]) =>
      await updateChatMemberOnlineStatus({ chatIds, online })
  })
}
