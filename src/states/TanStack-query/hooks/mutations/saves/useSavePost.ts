import { updateSave } from '@/services/appwrite/saves/updateSave'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSavePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      postId,
      userId
    }: {
      postId: string
      userId: string
    }) => await updateSave({ postId, userId }),
    onSuccess: success => {
      if (success?.data == null) {
        return
      }
      const { data: savedRecord } = success
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, savedRecord?.$id]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
    }
  })
}
