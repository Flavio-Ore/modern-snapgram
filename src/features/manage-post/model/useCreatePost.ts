import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import type { NewPostData } from '@shared/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newPost: NewPostData) => await apiClient.posts.createPost(newPost),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
      })
    }
  })
}
