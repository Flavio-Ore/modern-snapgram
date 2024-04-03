import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Models, Query } from 'appwrite'
import {
  getInfinitePosts,
  getInfiniteSaves,
  getSavedPosts
} from '../services/api'
import { QUERY_KEYS } from './queryKeys'

const initialPageParam = ''
const INFINITY_QUERIES = {
  RECENT_POSTS: [Query.orderDesc('$createdAt')],
  UPDATED_POSTS: [Query.orderDesc('$updatedAt')],
  searchPosts: ({ searchTerm }: SearchTerm) => [
    Query.search('caption', searchTerm)
  ],
  SAVED_POSTS: [Query.select(['*'])]
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

// ============================================================
// SAVED POSTS
// ============================================================

// Get x limit of posts from a user on saves record, then display more on scroll
export const useGetInfiniteSavedPosts = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, userId],
    queryFn: ({ pageParam }) =>
      getInfiniteSaves({
        lastId: pageParam,
        queries: [Query.equal('user', userId)]
      }),
    enabled: !!userId,
    getNextPageParam: nextCursor,
    initialPageParam
  })
}

export const useSavedPosts = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, userId + '12'],
    queryFn: () => getSavedPosts({ userId }),
    enabled: !!userId
  })
}
