import { findInfinitePosts } from '@/services/appwrite/posts/findInfinitePosts'
import {
  type Post,
  type UserModel
} from '@/types'
import { Query } from 'appwrite'

export async function findInfinitePostsByUserId ({
  lastId = '',
  userId
}: {
  lastId: Post['$id']
  userId?: UserModel['$id']
}) {
  if (userId == null || userId.trim().length === 0) return null
  return await findInfinitePosts({
    lastId,
    query: [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
  })
}
