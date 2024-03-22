import { useInfiniteQuery } from '@tanstack/react-query'
import { Models, Query } from 'appwrite'
import { getInfinitePosts } from '../services/api'
import { QUERY_KEYS } from './queryKeys'

const initialPageParam = ''
const INFINITY_QUERIES = {
  RECENT_POSTS: [Query.orderDesc('$createdAt')],
  UPDATED_POSTS: [Query.orderDesc('$updatedAt')],
  searchPosts: ({ searchTerm }: SearchTerm) => [
    Query.search('caption', searchTerm)
  ]
}

const nextCursor = (lastPage: Models.Document[]) => {
  if (!lastPage) return null
  if (lastPage.length === 0) return null
  const lastId = lastPage[lastPage.length - 1].$id
  return lastId || null
}

export const useGetInfiniteRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: ({ pageParam }) =>
      getInfinitePosts({
        lastId: pageParam,
        queries: INFINITY_QUERIES.RECENT_POSTS
      }),
    getNextPageParam: nextCursor,
    initialPageParam
  })
}

export function useGetInfinitePosts () {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: ({ pageParam }) =>
      getInfinitePosts({
        lastId: pageParam,
        queries: INFINITY_QUERIES.UPDATED_POSTS
      }),
    getNextPageParam: nextCursor,
    initialPageParam
  })
}

type SearchTerm = { searchTerm: string }
export const useInfiniteSearchPosts = ({ searchTerm }: SearchTerm) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: ({ pageParam }) =>
      getInfinitePosts({
        lastId: pageParam,
        queries: INFINITY_QUERIES.searchPosts({ searchTerm })
      }),
    enabled: !!searchTerm,
    getNextPageParam: nextCursor,
    initialPageParam
  })
}
