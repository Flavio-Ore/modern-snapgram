import { signInAccount } from '@/services/appwrite/session/signInAccount'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signInAccount,
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
    }
  })
}
