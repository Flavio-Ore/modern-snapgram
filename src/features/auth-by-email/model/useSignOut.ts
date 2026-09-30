import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOutAccount } from '../api/signOutAccount'

export const useSignOut = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signOutAccount,
    onSuccess: () => {
      void queryClient.resetQueries()
    }
  })
}
