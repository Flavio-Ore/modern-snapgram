import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import { api } from '@/services'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type Models, Query } from 'appwrite'

const { posts, saves, users } = api

const initialPageParam = ''

const enabledId = (id: string) => {
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}
const INFINITY_QUERIES = {
  RECENT_POSTS: [Query.orderDesc('$createdAt')],
  UPDATED_POSTS: [Query.orderDesc('$updatedAt')],
  searchPosts: ({ searchTerm }: SearchTerm) => [
    Query.search('caption', searchTerm)
  ],
  SAVED_POSTS: [Query.select(['*'])],
  USERS: [Query.orderDesc('$createdAt')]
}

const nextCursor = (lastPage: Models.Document[] | null) => {
  if (lastPage == null) return null
  if (lastPage.length === 0) return null
  const lastId = lastPage[lastPage.length - 1].$id
  return lastId
}

export const useGetInfiniteRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: async ({ pageParam }) =>
      await posts.findInfinite({
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
    queryFn: async ({ pageParam }) =>
      await posts.findInfinite({
        lastId: pageParam,
        queries: INFINITY_QUERIES.UPDATED_POSTS
      }),
    getNextPageParam: nextCursor,
    initialPageParam
  })
}

interface SearchTerm {
  searchTerm: string
}
export const useInfiniteSearchPosts = ({ searchTerm }: SearchTerm) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: async ({ pageParam }) =>
      await posts.findInfinite({
        lastId: pageParam,
        queries: INFINITY_QUERIES.searchPosts({ searchTerm })
      }),
    enabled: enabledId(searchTerm),
    getNextPageParam: nextCursor,
    initialPageParam
  })
}

// ============================================================
// USERS
// ============================================================

export const useGetInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: async ({ pageParam }) =>
      await users.findInfinite({
        lastId: pageParam,
        queries: INFINITY_QUERIES.USERS
      }),
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
    queryFn: async ({ pageParam }) =>
      await saves.findInfinite({
        lastId: pageParam,
        queries: [Query.equal('user', userId)]
      }),
    enabled: enabledId(userId),
    getNextPageParam: nextCursor,
    initialPageParam
  })
}
