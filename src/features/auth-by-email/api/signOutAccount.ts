import { apiClient } from '@shared/api'

export const signOutAccount = async () => {
  await apiClient.auth.signOut()
}
