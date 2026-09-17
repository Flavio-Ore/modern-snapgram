import { QUERY_KEYS } from '@/lib/queries/queryKeys'

import { appwriteService } from '@/services'
import {
  type DeletePostParams,
  type NewPostData,
  type UpdatedPostData,
  type UserUpdateData
} from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const { auth, likes, posts, saves, users, messages } = appwriteService

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: auth.createUserAccount
  })
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: auth.signInAccount
  })
}

export const useSignOut = () => {
  return useMutation({
    mutationFn: auth.signOutAccount
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newPost: NewPostData) => await posts.createPost(newPost),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}
export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updatedPost: UpdatedPostData) =>
      await posts.updatePost(updatedPost),
    onSuccess: success => {
      if (success?.data == null) {
        return
      }
      const { data: updatedPost } = success
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, updatedPost.$id]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_USER_POSTS, updatedPost.creator.$id]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ postId, filesId }: DeletePostParams) =>
      await posts.deletePost({ postId, filesId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.SEARCH_POSTS]
      })
    }
  })
}
export const useLikePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: likes.updateLikesPost,
    onSuccess: data => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POSTS]
      // })
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
    }) => await saves.updateSave({ postId, userId }),
    onSuccess: success => {
      if (success?.data != null) {
        const { data: savedRecord } = success
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, savedRecord?.$id]
        })
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        })
      }
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      // })
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POSTS]
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
      await saves.deleteSave({ savedRecordId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID]
      })
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
    mutationFn: async (updatedUser: UserUpdateData) =>
      await users.updateUser({ user: updatedUser }),
    onSuccess: success => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
      if (success?.data == null) return
      const { data: updatedUser } = success
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, updatedUser.$id]
      })
    }
  })
}

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ messageId }: { messageId: string }) =>
      await messages.deleteMessage({ messageId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES]
      })
    }
  })
}

// ============================================================
// BETAS
// ============================================================
export const useBetaCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newPost: NewPostData) =>
      await posts.betaCreatePost(newPost),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
    }
  })
}
