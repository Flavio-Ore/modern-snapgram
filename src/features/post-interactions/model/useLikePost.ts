import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLikePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      postId,
      likesArray
    }: {
      postId: string
      likesArray: string[]
    }) => await apiClient.posts.likePost(postId, likesArray),
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
      })
    }
  })
}
