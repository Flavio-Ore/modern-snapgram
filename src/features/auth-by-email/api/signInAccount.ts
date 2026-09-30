import { apiClient } from '@shared/api'

export const signInAccount = async (credentials: { email: string; password: string }) => {
  return await apiClient.auth.signIn(credentials)
}
