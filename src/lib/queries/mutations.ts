import { QUERY_KEYS } from '@/lib/queries/queryKeys'

import { api } from '@/lib/services'
import { type INewPost, type IUpdatePost, type IUpdateUser } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const { account, likes, posts, saves, users } = api


export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: account.create
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: account.signIn
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: account.signOut
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newPost: INewPost) => await posts.create(newPost),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updatedPost: IUpdatePost) => await posts.update(updatedPost),
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      postId,
      imageId
    }: {
      postId: string
      imageId: string
    }) => await posts.delete({ postId, imageId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: likes.update,
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      // })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POSTS]
      // })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      postId,
      userId
    }: {
      postId: string
      userId: string
    }) => await saves.update({ postId, userId }),
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      // })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POSTS]
      // })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      // })
    }
  })
}
interface DeleteSavedPost {
  savedRecordId: string
}
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ savedRecordId }: DeleteSavedPost) =>
      await saves.delete({ savedRecordId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
    //   })
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEYS.GET_POSTS]
    //   })
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updatedUser: IUpdateUser) => await users.update({ user: updatedUser }),
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id]
      })
    }
  })
}
