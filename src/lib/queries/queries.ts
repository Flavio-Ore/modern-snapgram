import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import { appwriteService } from '@/services'
import { useQuery } from '@tanstack/react-query'
const { auth, posts, users, saves } = appwriteService

const enabledId = (id: string) => {
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}
export const useGetPostById = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: async () => await posts.findPostById(postId),
    select: response => response?.data ?? null,
    enabled: enabledId(postId)
  })
}

export const useGetSavedRecord = ({ recordId }: { recordId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_RECORD, recordId],
    queryFn: async () =>
      await saves.findSaveRecordById({ savedRecordId: recordId }),
    enabled: enabledId(recordId)
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: auth.getUser,
    select: response => response?.data ?? null
  })
}

export const useGetTopUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await users.findTopUsers({ limit }),
    select: response => response?.data
  })
}

export const useGetUserById = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: async () => await users.findUserById({ userId }),
    select: response => response?.data,
    enabled: enabledId(userId)
  })
}
