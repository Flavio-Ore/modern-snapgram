import { findSaveRecordById } from '@/services/appwrite/saves/findSaveRecordById'
import { QUERY_KEYS } from '@/states/TanStack-query/keys/queryKeys'
import { enabledId } from '@/states/TanStack-query/utils/enabledId'
import { useQuery } from '@tanstack/react-query'

export const useGetSavedRecord = ({ recordId }: { recordId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_RECORD, recordId],
    queryFn: async () =>
      await findSaveRecordById({ savedRecordId: recordId }),
    enabled: enabledId(recordId)
  })
}
