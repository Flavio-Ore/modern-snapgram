import { createUserAccount } from '@/services/appwrite/session/createUserAccount'
import { useMutation } from '@tanstack/react-query'

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: createUserAccount
  })
}
