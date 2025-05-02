import { QUERY_KEYS } from '@/states/keys/queryKeys'
import {
  type UpdatedPostData
} from '@/types'
import { updatePost } from '@posts/services/updatePost'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updatedPost: UpdatedPostData) =>
      await updatePost(updatedPost),
    onSuccess: success => {
      if (success?.data == null) {
        return
      }
      const { data: updatedPost } = success
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, updatedPost.$id]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_USER_POSTS, updatedPost.creator.$id]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
      })
    }
  })
}
