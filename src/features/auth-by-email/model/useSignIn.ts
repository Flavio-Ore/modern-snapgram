import { QUERY_KEYS } from '@shared/config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signInAccount } from '../api/signInAccount'

export const useSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signInAccount,
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.IS_AUTHENTICATED]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_TOP_CREATORS]
      })
    }
  })
}
