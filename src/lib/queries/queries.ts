import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import { api } from '@/lib/services'
import { useQuery } from '@tanstack/react-query'
const { account, findUserPosts, posts, users, saves } = api

const enabledId = (id: string) => {
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}
export const useGetPostById = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: async () => await posts.findById(postId),
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

export const useGetSavedRecord = ({ recordId }: { recordId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_RECORD, recordId],
    queryFn: async () => await saves.findById({ savedRecordId: recordId }),
    enabled: enabledId(recordId)
  })
}

// ============================================================
// USER QUERIES
// ============================================================

export const useUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: account.user
  })
}

export const useGetUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await users.findAll({ limit })
  })
}

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => await users.findById({ userId }),
    enabled: enabledId(userId)
  })
}
