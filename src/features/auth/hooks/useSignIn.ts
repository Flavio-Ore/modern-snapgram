import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { signInAccount } from '@auth/services/signInAccount'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signInAccount,
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.IS_AUTHENTICATED]
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
