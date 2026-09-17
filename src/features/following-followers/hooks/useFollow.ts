import { updateFollows } from '@/features/following-followers/services/updateFollows'
import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useFollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      followedUserId,
      followerUserId
    }: Parameters<typeof updateFollows>[0]) =>
      await updateFollows({
        followerUserId,
        followedUserId
      }),
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
