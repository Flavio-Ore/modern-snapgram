import { deleteSave } from '@/services/appwrite/saves/deleteSave'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
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
