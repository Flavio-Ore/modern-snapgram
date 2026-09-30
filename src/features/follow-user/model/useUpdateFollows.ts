import { QUERY_KEYS } from '@shared/config'
import { followApi } from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Mutation hook to follow a user with automatic cache invalidation.
 */
export const useFollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      followedUserId,
      followerUserId
    }: {
      followedUserId: string
      followerUserId: string
    }) => {
      const response = await followApi.updateFollows({
        followerUserId,
        followedUserId
      })
      if (!response?.data) {
        throw new Error('Failed to follow user')
      }
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWERS]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWINGS]
      })
    }
  })
}

/**
 * Mutation hook to unfollow a user with automatic cache invalidation.
 */
export const useUnfollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ followRecordId }: { followRecordId: string }) => {
      const response = await followApi.deleteFollow({ followRecordId })
      if (!response) {
        throw new Error('Failed to unfollow user')
      }
      return response
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWERS]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWINGS]
      })
    }
  })
}

/**
 * Combined hook returning follow and unfollow mutation triggers with pending state flags.
 */
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
