import { QUERY_KEYS } from '@/states/keys/queryKeys'
import { deleteSave } from '@saved/services/deleteSave'
import { useMutation, useQueryClient } from '@tanstack/react-query'


interface DeleteSavedPost {
  savedRecordId: string
}
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ savedRecordId }: DeleteSavedPost) =>
      await deleteSave({ savedRecordId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SESSION_USER]
      })
    }
  })
}
