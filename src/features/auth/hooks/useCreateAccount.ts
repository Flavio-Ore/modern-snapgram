import { createUserAccount } from '@auth/services/createUserAccount'
import { useMutation } from '@tanstack/react-query'

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: createUserAccount
  })
}
