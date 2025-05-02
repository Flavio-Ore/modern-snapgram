import {
  account,
  appwriteConfig,
  databases
} from '@/services/config'
import { appwriteResponse } from '@/services/utils/appwriteResponse'
import { APPWRITE_RESPONSE_CODES } from '@/services/utils/constants/APPWRITE_RESPONSE_CODES'
import { type UserModel } from '@/types'
import { AppwriteException, Query } from 'appwrite'

export async function findTopUsers ({ limit }: { limit?: number }) {
  try {
    const userAccount = await account.get()
    const query = [
      Query.notEqual('accountId', userAccount.$id),
      Query.orderDesc('$createdAt'),
      Query.limit(100)
    ]

    const users = await databases.listDocuments<UserModel>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      query
    )

    const usersFollowersCount = users.documents.map(user => {
      return {
        ...user,
        followingsCount: user.followings.length,
        followersCount: user.followers.length
      }
    })

    const sortedUserByFollowersWithFollowersCount = usersFollowersCount.sort(
      (a, b) => b.followersCount - a.followersCount
    )

    const sortedUsersByFollowers: UserModel[] =
      sortedUserByFollowersWithFollowersCount
        .map(user => {
          const { followersCount, followingsCount, ...userModel } = user
          return userModel
        })
        .splice(0, limit)

    return appwriteResponse({
      data: sortedUsersByFollowers,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error({ e })
    if (e instanceof AppwriteException) {
      return appwriteResponse({
        data: [],
        message: e.message,
        code: e.code,
        status: e.type
      })
    }
    return null
  }
}
