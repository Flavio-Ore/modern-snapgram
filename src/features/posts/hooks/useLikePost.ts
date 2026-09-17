import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { updateLikesPost } from '@posts/services/updateLikesPost'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLikePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateLikesPost,
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
