import { findInfinitePosts } from '@posts/services/findInfinitePosts'
import { Query } from 'appwrite'


export async function findInfiniteUpdatedPosts ({ lastId = '' }) {
  return await findInfinitePosts({
    lastId,
    query: [Query.orderDesc('$updatedAt')]
  })
}
