import { INewPost, INewUser } from '@/types'
import { QueryClient, useMutation } from '@tanstack/react-query'
import {
  createPost,
  createUserAccount,
  signInAccount,
  signOutAccount
} from '../services/api'
import { QUERY_KEYS } from './queryKeys'

export class Mutations {
  constructor (private queryClient: QueryClient) {}

  useCreateUserAccount = () => {
    return useMutation({
      mutationFn: (user: INewUser) => createUserAccount(user)
    })
  }

  useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user)
    })
  }

  useSignOutAccount = () => {
    return useMutation({
      mutationFn: () => signOutAccount()
    })
  }
  useCreatePost = () => {
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        this.queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        })
      }
    })
  }
}
