import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import type { DeletePostParams } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ postId, filesId }: DeletePostParams) =>
      await apiClient.posts.deletePost({ postId, filesId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_UPDATED_POSTS]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_POSTS]
      })
    }
  })
}
