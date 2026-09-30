import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface DeleteSavedPostParams {
  savedRecordId: string
}

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ savedRecordId }: DeleteSavedPostParams) =>
      await apiClient.saves.deleteSave(savedRecordId),
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
