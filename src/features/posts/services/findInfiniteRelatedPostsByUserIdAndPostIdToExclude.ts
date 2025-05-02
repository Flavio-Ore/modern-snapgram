import {
  type Post,
  type UserModel
} from '@/types'
import { findInfinitePosts } from '@posts/services/findInfinitePosts'
import { Query } from 'appwrite'

export async function findInfiniteRelatedPostsByUserIdAndPostIdToExclude ({
  lastId = '',
  userId,
  postId
}: {
  lastId: Post['$id']
  userId: UserModel['$id']
  postId: Post['$id']
}) {
  if (userId == null || userId.trim().length === 0) return null
  return await findInfinitePosts({
    lastId,
    query: [
      Query.equal('creator', userId),
      Query.notEqual('$id', postId),
      Query.orderDesc('$createdAt')
    ]
  })
}
