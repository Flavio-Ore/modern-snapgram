import type { AppwriteResponse } from '../types'
import type { Models } from 'appwrite'

export const INITIAL_PAGE_PARAM = ''

export const getNextCursor = <T extends Models.Document>(
  lastPage: AppwriteResponse<T[]> | null
): string | null => {
  if (lastPage?.data == null || lastPage.data.length === 0) return null
  return lastPage.data[lastPage.data.length - 1].$id
}

export const enabledId = (id: string | null | undefined): boolean => {
  if (id == null) return false
  return id.trim().length > 0
}
