import { INewPost, IUpdatePost, IUpdateUser } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createPost,
  createUserAccount,
  deletePost,
  DeleteSavedPost,
  deleteSavedPost,
  likePost,
  savePost,
  signInAccount,
  signOutAccount,
  updatePost,
  updateUser
} from '../services/api'
import { QUERY_KEYS } from './queryKeys'

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: createUserAccount
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: signInAccount
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost({ postId, imageId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: likePost,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      // })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POSTS]
      // })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost({ postId, userId }),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      }),
        queryClient.invalidateQueries({
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

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ savedRecordId }: DeleteSavedPost) =>
      deleteSavedPost({ savedRecordId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
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
    mutationFn: (user: IUpdateUser) => updateUser({ user }),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id]
      })
    }
  })
}
