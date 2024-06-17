import { appwriteConfig, databases } from '@/services/appwrite/config'
import {
  APPWRITE_RESPONSE_CODES,
  appwriteResponse
} from '@/services/appwrite/util'
import { type FollowingFollowersModel, type UserModel } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'

export async function findInfiniteFollows ({
  lastId = '',
  query
}: {
  lastId: FollowingFollowersModel['$id']
  query: string[]
}) {
  const queries = [...query, Query.limit(2)]
  if (lastId.trim().length !== 0) {
    queries.push(Query.cursorAfter(lastId))
  }
  try {
    const { documents: followsRecords } =
      await databases.listDocuments<FollowingFollowersModel>(
        appwriteConfig.databaseId,
        appwriteConfig.followersCollectionId,
        queries
      )
    return appwriteResponse({
      data: followsRecords,
      message: APPWRITE_RESPONSE_CODES.OK.message,
      code: APPWRITE_RESPONSE_CODES.OK.code,
      status: APPWRITE_RESPONSE_CODES.OK.status
    })
  } catch (e) {
    console.error(e)
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

interface InfiniteFollowsParams {
  lastId: FollowingFollowersModel['$id']
  userId: UserModel['$id']
}
export async function findInfiniteFollowings ({
  lastId = '',
  userId
}: InfiniteFollowsParams) {
  return await findInfiniteFollows({
    lastId,
    query: [
      Query.equal('following', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(2)
    ]
  })
}

export async function findInfiniteFollowers ({
  lastId = '',
  userId
}: InfiniteFollowsParams) {
  return await findInfiniteFollows({
    lastId,
    query: [
      Query.equal('followed', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(2)
    ]
  })
}
interface UpdateFollowArgs {
  followerUserId: UserModel['$id']
  followedUserId: UserModel['$id']
}
export async function updateFollows ({
  followerUserId: userFollowingId,
  followedUserId: newFollowedId
}: UpdateFollowArgs) {
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

export async function deleteFollow ({
  followRecordId
}: {
  followRecordId: FollowingFollowersModel['$id']
}) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.followersCollectionId,
      followRecordId
    )
    return appwriteResponse({
      data: null,
      message: '',
      status: APPWRITE_RESPONSE_CODES.NO_CONTENT.status,
      code: APPWRITE_RESPONSE_CODES.NO_CONTENT.code
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
