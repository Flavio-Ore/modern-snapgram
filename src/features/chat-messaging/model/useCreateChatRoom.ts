import { appwriteConfig } from '@shared/config'
import { databases } from '@shared/api'
import type { ChatMemberModel, ChatRoomModel, UserModel } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ID } from 'appwrite'

export const useCreateChatRoomFromUsers = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ users }: { users: UserModel[] }) => {
      if (users.length < 2) return null
      try {
        const chatMembers = await Promise.all(
          users.map(async u =>
            await databases.createDocument<ChatMemberModel>(
              appwriteConfig.databaseId,
              appwriteConfig.chatMemberCollectionId,
              ID.unique(),
              { member: u.$id }
            )
          )
        )
        const chatRoom = await databases.createDocument<ChatRoomModel>(
          appwriteConfig.databaseId,
          appwriteConfig.chatRoomCollectionId,
          ID.unique(),
          { members: chatMembers.map(m => m.$id) }
        )
        return chatRoom
      } catch {
        return null
      }
    },
    onSuccess: data => {
      if (data != null) {
        void queryClient.invalidateQueries()
      }
    }
  })
}
