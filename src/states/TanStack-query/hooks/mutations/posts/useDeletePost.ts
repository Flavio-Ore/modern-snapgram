import { deletePost } from '@/services/appwrite/posts/deletePost'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import {
  type DeletePostParams
} from '@/types'
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
