import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import { appwriteService } from '@/services'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type Models, Query } from 'appwrite'

const { posts, saves, users } = appwriteService

const initialPageParam = ''
const enabledId = (id: string) => id != null && id.trim().length !== 0 && id !== ''
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
      await posts.findInfinitePosts({
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
      await posts.findInfinitePosts({
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
      await posts.findInfinitePosts({
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
      await users.findInfiniteUsers({
        lastId: pageParam,
        queries: INFINITY_QUERIES.USERS
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage?.data == null) return null
      return lastPage.data.length === 0 ? null : lastPage.data[lastPage.data.length - 1].$id
    },
    initialPageParam
  })
}

// ============================================================
// SAVED POSTS
// ============================================================

export const useGetInfiniteSavedPosts = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS, userId],
    queryFn: async ({ pageParam }) =>
      await saves.findInfiniteSaves({
        lastId: pageParam,
        queries: [Query.equal('user', userId)]
      }),
    enabled: enabledId(userId),
    getNextPageParam: (lastPage) => {
      if (lastPage?.data == null) return null
      return lastPage.data.length === 0 ? null : lastPage.data[lastPage.data.length - 1].$id
    },
    initialPageParam
  })
}
