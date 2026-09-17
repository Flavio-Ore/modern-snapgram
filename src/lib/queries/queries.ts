import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import { appwriteService } from '@/services'
import { useQuery } from '@tanstack/react-query'
const { auth, utils, posts, users, saves, file } = appwriteService

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

export const useGetUserPosts = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: async () => await utils.findUserPosts({ userId }),
    enabled: enabledId(userId)
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

// ============================================================
// USER QUERIES
// ============================================================

export const useUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: auth.getUser,
    select: response => response?.data ?? null
  })
}

export const useGetUsers = ({ limit }: { limit?: number }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TOP_CREATORS, limit],
    queryFn: async () => await users.findAllUsers({ limit }),
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

export const useGetFilesByIds = ({ filesId }: { filesId: string[] }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FILES_BY_IDS, filesId],
    queryFn: async () => await file.getFilesById(filesId),
    select: response => response ?? []
  })
}
