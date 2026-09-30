import { apiClient } from '@shared/api'
import type { AppwriteResponse, FollowingFollowersModel } from '@shared/types'

/**
 * Follow API adapter delegating all follower/following operations to the unified apiClient.
 */
export const followApi = {
  /**
   * Creates a new follow relationship between follower and followed users.
   */
  updateFollows: async ({
    followerUserId,
    followedUserId
  }: {
    followerUserId: string
    followedUserId: string
  }): Promise<AppwriteResponse<FollowingFollowersModel | null> | null> => {
    return await apiClient.follows.followUser({
      followerUserId,
      followedUserId
    })
  },

  /**
   * Deletes an existing follow record by its unique document ID.
   */
  deleteFollow: async ({
    followRecordId
  }: {
    followRecordId: string
  }): Promise<AppwriteResponse<null> | null> => {
    return await apiClient.follows.unfollowUser({
      followRecordId
    })
  },

  /**
   * Retrieves a paginated list of followers for a given user.
   */
  findInfiniteFollowers: async ({
    userId,
    lastId = ''
  }: {
    userId: string
    lastId?: string
  }): Promise<AppwriteResponse<FollowingFollowersModel[]> | null> => {
    return await apiClient.follows.getInfiniteFollowers({
      userId,
      lastId
    })
  },

  /**
   * Retrieves a paginated list of users followed by a given user.
   */
  findInfiniteFollowings: async ({
    userId,
    lastId = ''
  }: {
    userId: string
    lastId?: string
  }): Promise<AppwriteResponse<FollowingFollowersModel[]> | null> => {
    return await apiClient.follows.getInfiniteFollowings({
      userId,
      lastId
    })
  }
}
