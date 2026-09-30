import { apiClient } from '@shared/api'
import { QUERY_KEYS } from '@shared/config'
import { enabledId } from '@shared/lib'
import { useQuery } from '@tanstack/react-query'

export const useGetPostById = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: async () => await apiClient.posts.getPostById(postId),
    select: response => response?.data ?? null,
    enabled: enabledId(postId)
  })
}
