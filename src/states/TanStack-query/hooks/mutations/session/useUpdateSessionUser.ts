import { updateUser } from '@/services/appwrite/users/updateUser'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import {
  type UserUpdateData
} from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateSessionUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updatedUser: UserUpdateData) =>
      await updateUser({ user: updatedUser }),
    onSuccess: success => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_USERS]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
      if (success?.data == null) return
      const { data: updatedUser } = success
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, updatedUser.$id]
      })
    }
  })
}
