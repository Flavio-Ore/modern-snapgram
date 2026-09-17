
import { signOutAccount } from '@/services/appwrite/session/signOutAccount'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSignOut = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signOutAccount,
    onSuccess: () => {
      void queryClient.resetQueries()
    }
  })
}
