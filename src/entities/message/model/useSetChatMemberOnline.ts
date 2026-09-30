import { apiClient } from '@shared/api'
import { useMutation } from '@tanstack/react-query'

export const useSetChatMemberOnline = () => {
  return useMutation({
    mutationFn: async ({
      chatIds,
      online
    }: {
      chatIds: string[]
      online: boolean
    }) => await apiClient.chats.setMemberOnline(chatIds, online)
  })
}
