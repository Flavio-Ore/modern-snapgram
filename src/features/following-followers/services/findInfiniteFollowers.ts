import { type FollowingFollowersModel, type UserModel } from '@/types'
import { findInfiniteFollows } from '@following-followers/services/findInfiniteFollows'
import { Query } from 'appwrite'

export async function findInfiniteFollowers ({
  lastId = '',
  userId
}: {
  lastId: FollowingFollowersModel['$id']
  userId: UserModel['$id']
}) {
  return await findInfiniteFollows({
    lastId,
    query: [
      Query.equal('followed', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(2)
    ]
  })
}
