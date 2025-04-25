import { createPost } from '@/services/appwrite/posts/createPost'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import {
  type NewPostData
} from '@/types'
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
