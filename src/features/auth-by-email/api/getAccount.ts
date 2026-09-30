import { apiClient } from '@shared/api'

export const getAccount = async () => {
  return await apiClient.auth.getAccount()
}
