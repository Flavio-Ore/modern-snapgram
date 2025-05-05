import { type AppwriteResponse } from '@/services/interfaces'
import { type Models } from 'appwrite'

export const getNextCursor = <T extends Models.Document>(
  lastPage: AppwriteResponse<T[]> | null
) => {
  if (lastPage?.data == null) return null
  return lastPage.data.length === 0
    ? null
    : lastPage.data[lastPage.data.length - 1].$id
}
