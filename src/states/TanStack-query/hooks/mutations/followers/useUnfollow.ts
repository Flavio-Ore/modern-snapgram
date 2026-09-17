
import { deleteFollow } from '@/services/appwrite/followers/deleteFollow'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUnfollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ followRecordId }: { followRecordId: string }) =>
      await deleteFollow({ followRecordId }),
    onSuccess: data => {
      if (data != null) {
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_SESSION_USER]
        })
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_USER_BY_ID]
        })
      }
    }
  })
}

