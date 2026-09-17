import { QUERY_KEYS } from '@/states/queryKeys'
import {
  type NewPostData
} from '@/types'
import { createPost } from '@posts/services/createPost'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newPost: NewPostData) => await createPost(newPost),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
      })
    }
  })
}
