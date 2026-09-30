import { apiClient } from '@shared/api'

export const isAuthenticated = async () => {
  return await apiClient.auth.checkAuth()
}
