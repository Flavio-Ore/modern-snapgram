
import { QUERY_KEYS } from '@/states/queryKeys'
import { deleteFollow } from '@following-followers/services/deleteFollow'
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

