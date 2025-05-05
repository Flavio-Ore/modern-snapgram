import { enabledId } from '@/states/enabledId'
import { QUERY_KEYS } from '@/states/queryKeys'
import { findSaveRecordById } from '@saved/services/findSaveRecordById'
import { useQuery } from '@tanstack/react-query'

export const useGetSavedRecord = ({ recordId }: { recordId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_RECORD, recordId],
    queryFn: async () =>
      await findSaveRecordById({ savedRecordId: recordId }),
    enabled: enabledId(recordId)
  })
}
