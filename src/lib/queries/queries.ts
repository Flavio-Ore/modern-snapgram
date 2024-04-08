import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { findUserPosts } from '../services/appwrite/api'
import { getCurrentSessionUser } from '../services/appwrite/auth'
import { findPostById } from '../services/appwrite/posts'
import { findAllUsers, findUserById } from '../services/appwrite/users'

const enabledId = (id: string) => {
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}
export const useGetPostById = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: async () => await findPostById(postId),
    enabled: enabledId(postId)
  })
}

export const useGetUserPosts = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: async () => await findUserPosts({ userId }),
    enabled: enabledId(userId)
  })
}

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentSessionUser
  })
}

export const useGetUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await findAllUsers({ limit })
  })
}

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => await findUserById({ userId }),
    enabled: enabledId(userId)
  })
}
