import { appwriteConfig } from '@shared/config'
import { databases } from '@shared/api'
import type { AppwriteResponse, FollowingFollowersModel } from '@shared/types'
import { ID, Query } from 'appwrite'

const createResponse = <T>(
  data: T,
  message = 'Success',
  code = 200,
  status = 'OK'
): AppwriteResponse<T> => ({
  data,
  message,
  status,
  code
})

export const followApi = {
  updateFollows: async ({
    followerUserId,
    followedUserId
  }: {
    followerUserId: string
    followedUserId: string
  }): Promise<AppwriteResponse<FollowingFollowersModel | null> | null> => {
    try {
      const newFollowRecord = await databases.createDocument<FollowingFollowersModel>(
        appwriteConfig.databaseId,
        appwriteConfig.followersCollectionId,
        ID.unique(),
        {
          following: followerUserId,
          followed: followedUserId
        }
      )
      return createResponse(newFollowRecord, 'Follow record created', 201, 'CREATED')
    } catch {
      return null
    }
  },

  deleteFollow: async ({
    followRecordId
  }: {
    followRecordId: string
  }): Promise<AppwriteResponse<null> | null> => {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.followersCollectionId,
        followRecordId
      )
      return createResponse(null, 'Follow deleted', 200, 'OK')
    } catch {
      return null
    }
  },

  findInfiniteFollowers: async ({
    userId,
    lastId = ''
  }: {
    userId: string
    lastId?: string
  }): Promise<AppwriteResponse<FollowingFollowersModel[]> | null> => {
    const queries = [
      Query.equal('followed', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(10)
    ]
    if (lastId.trim().length > 0) {
      queries.push(Query.cursorAfter(lastId))
    }
    try {
      const res = await databases.listDocuments<FollowingFollowersModel>(
        appwriteConfig.databaseId,
        appwriteConfig.followersCollectionId,
        queries
      )
      return createResponse(res.documents)
    } catch {
      return null
    }
  },

  findInfiniteFollowings: async ({
    userId,
    lastId = ''
  }: {
    userId: string
    lastId?: string
  }): Promise<AppwriteResponse<FollowingFollowersModel[]> | null> => {
    const queries = [
      Query.equal('following', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(10)
    ]
    if (lastId.trim().length > 0) {
      queries.push(Query.cursorAfter(lastId))
    }
    try {
      const res = await databases.listDocuments<FollowingFollowersModel>(
        appwriteConfig.databaseId,
        appwriteConfig.followersCollectionId,
        queries
      )
      return createResponse(res.documents)
    } catch {
      return null
    }
  }
}
