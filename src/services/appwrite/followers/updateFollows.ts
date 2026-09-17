import { appwriteConfig, databases } from '@/services/appwrite/config'
import { appwriteResponse } from '@/services/appwrite/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/appwrite/utils/constants/APPWRITE_RESPONSE_CODES'
import { type FollowingFollowersModel, type UserModel } from '@/types'
import { AppwriteException, ID } from 'appwrite'

export async function updateFollows ({
  followerUserId: userFollowingId,
  followedUserId: newFollowedId
}: {
  followerUserId: UserModel['$id']
  followedUserId: UserModel['$id']
}) {
  try {
    const newFollowRecord =
      await databases.createDocument<FollowingFollowersModel>(
        appwriteConfig.databaseId,
        appwriteConfig.followersCollectionId,
        ID.unique(),
        {
          following: userFollowingId,
          followed: newFollowedId
        }
      )
    return appwriteResponse({
      data: newFollowRecord,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error(e)
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: null,
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}
