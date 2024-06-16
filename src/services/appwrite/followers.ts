import { type FollowingFollowersModel, type UserModel } from '@/types'
import { AppwriteException, ID, Query } from 'appwrite'
import { appwriteConfig, databases } from './config'
import { APPWRITE_RESPONSE_CODES, appwriteResponse } from './util'

interface UpdateFollowArgs {
  followerUserId: UserModel['$id']
  followedUserId: UserModel['$id']
}
export async function updateFollows ({
  followerUserId: userFollowingId,
  followedUserId: newFollowedId
}: UpdateFollowArgs) {
  try {
    const newFollowRecord = await databases.createDocument<FollowingFollowersModel>(
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

export async function findInfiniteFollowers ({
  userId,
  lastId = ''
}: {
  userId: string
  lastId: string
}) {
  const query = [Query.equal('followed', userId), Query.limit(1)]
  if (lastId.trim().length !== 0) {
    query.push(Query.cursorAfter(lastId.toString()))
  }
  try {
    const followers = await databases.listDocuments<FollowingFollowersModel>(
      appwriteConfig.databaseId,
      appwriteConfig.followersCollectionId,
      query
    )
    return followers.documents.map(({ follower }) => follower)
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function findInfiniteFollowing ({
  userId,
  lastId = ''
}: {
  userId: string
  lastId: string
}) {
  const query = [Query.equal('following', userId), Query.limit(1)]
  if (lastId.trim().length !== 0) {
    query.push(Query.cursorAfter(lastId.toString()))
  }
  try {
    const following = await databases.listDocuments<FollowingFollowersModel>(
      appwriteConfig.databaseId,
      appwriteConfig.followersCollectionId,
      query
    )
    return following.documents.map(({ following }) => following)
  } catch (error) {
    console.error(error)
    return null
  }
}
