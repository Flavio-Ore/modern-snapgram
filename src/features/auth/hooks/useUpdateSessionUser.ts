import { QUERY_KEYS } from '@/states/queryKeys'
import {
  type UserUpdateData
} from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@users/services/updateUser'

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
