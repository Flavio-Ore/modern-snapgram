import { findInfinitePosts } from '@/services/appwrite/posts/findInfinitePosts'
import {
  type Post
} from '@/types'
import { Query } from 'appwrite'


export async function findInfiniteSearchedPosts ({
  lastId = '',
  searchTerm = ''
}: {
  lastId: Post['$id']
  searchTerm: string
}) {
  return await findInfinitePosts({
    lastId,
    query: [Query.search('caption', searchTerm), Query.orderDesc('$createdAt')]
  })
}
