import { QUERY_KEYS } from '@shared/config'
import { followApi } from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useFollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      followedUserId,
      followerUserId
    }: {
      followedUserId: string
      followerUserId: string
    }) =>
      await followApi.updateFollows({
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

export const useUnfollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ followRecordId }: { followRecordId: string }) =>
      await followApi.deleteFollow({ followRecordId }),
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

export const useUpdateFollows = () => {
  const followMutation = useFollow()
  const unfollowMutation = useUnfollow()

  return {
    follow: followMutation.mutateAsync,
    unfollow: unfollowMutation.mutateAsync,
    isFollowingPending: followMutation.isPending,
    isUnfollowingPending: unfollowMutation.isPending,
    isPending: followMutation.isPending || unfollowMutation.isPending
  }
}
