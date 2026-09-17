import { enabledId } from '@/states/enabledId'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findPostById } from '@posts/services/findPostById'
import { useQuery } from '@tanstack/react-query'


export const useGetPostById = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: async () => await findPostById(postId),
    select: response => response?.data ?? null,
    enabled: enabledId(postId)
  })
}
