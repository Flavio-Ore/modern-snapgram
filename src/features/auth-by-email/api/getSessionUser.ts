import { apiClient } from '@shared/api'

export const getSessionUser = async () => {
  return await apiClient.auth.getCurrentUser()
}
