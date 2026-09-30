import { apiClient } from '@shared/api'
import type { INewUser } from '@shared/types'

export const createUserAccount = async (userData: INewUser) => {
  return await apiClient.auth.signUp(userData)
}
