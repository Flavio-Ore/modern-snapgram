import { useMutation } from '@tanstack/react-query'
import { createUserAccount } from '../api/createUserAccount'

export const useSignUp = () => {
  return useMutation({
    mutationFn: createUserAccount
  })
}

export const useCreateAccount = useSignUp
