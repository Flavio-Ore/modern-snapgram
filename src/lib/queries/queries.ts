import { IUpdateUser } from '@/types'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { Models, Query } from 'appwrite'
import {
  getCurrentUser,
  getInfinitePosts,
  getPostById,
  getUserById,
  getUserPosts,
  getUsers,
  updateUser
} from '../services/api'
import { QUERY_KEYS } from './queryKeys'

const getNextPageParamAppwrite = (lastPage: Models.Document[]) =>
  lastPage.reverse()?.[0]?.$id || undefined

const recentPostsQuery = [Query.orderDesc('$createdAt')]
export const useGetInfiniteRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: ({ pageParam }) =>
      getInfinitePosts({ lastId: pageParam, queries: recentPostsQuery }),
    getNextPageParam: (lastPage: Models.Document[]) => {
      console.log('lastPage :>> ', lastPage)
      return getNextPageParamAppwrite(lastPage)
    },
    initialPageParam: ''
  })
}

export const useGetPostById = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  })
}

export const useGetUserPosts = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: () => getUserPosts({ userId }),
    enabled: !!userId
  })
}

const useGetPostsQueries = [Query.orderDesc('$updatedAt')]
export function useGetPosts () {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: ({ pageParam }) =>
      getInfinitePosts({
        lastId: pageParam,
        queries: useGetPostsQueries
      }),
    getNextPageParam: (lastPage: Models.Document[]) => {
      console.log('lastPage :>> ', lastPage)
      if (!lastPage) return null
      if (lastPage.length === 0) return null
      return lastPage[lastPage.length - 1]?.$id || null
    },
    initialPageParam: ''
  })
}

type SearchTerm = { searchTerm: string }
const infiniteSearchPostsQueries = ({ searchTerm }: SearchTerm) => [
  Query.search('caption', searchTerm)
]
export const useInfiniteSearchPosts = ({ searchTerm }: SearchTerm) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: ({ pageParam }) =>
      getInfinitePosts({
        lastId: pageParam,
        queries: infiniteSearchPostsQueries({ searchTerm })
      }),
    enabled: !!searchTerm,
    getNextPageParam: (lastPage: Models.Document[]) => {
      console.log('lastPage :>> ', lastPage)
      return getNextPageParamAppwrite(lastPage)
    },
    initialPageParam: ''
  })
}

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser
  })
}

export const useGetUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers({ limit })
  })
}

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById({ userId }),
    enabled: !!userId
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser({ user }),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id]
      })
    }
  })
}
