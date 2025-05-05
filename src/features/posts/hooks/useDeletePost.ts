import { QUERY_KEYS } from '@/states/queryKeys'
import {
  type DeletePostParams
} from '@/types'
import { deletePost } from '@posts/services/deletePost'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ postId, filesId }: DeletePostParams) =>
      await deletePost({ postId, filesId }),
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
