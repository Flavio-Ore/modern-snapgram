import { QUERY_KEYS } from '@/lib/queries/queryKeys'

import {
  auth,
  chatRooms,
  chatsMember,
  follows,
  likes,
  messages,
  posts,
  saves,
  users
} from '@/services/appwrite'
import {
  type DeletePostParams,
  type NewPostData,
  type UpdatedPostData,
  type UserUpdateData
} from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
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
        queryKey: [QUERY_KEYS.GET_INFINITE_USER_POSTS, updatedPost.creator.$id]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
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
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_UPDATED_POSTS]
      })
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_POSTS]
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
        queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS]
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
    }) => await saves.updateSave({ postId, userId }),
    onSuccess: success => {
      if (success?.data == null) {
        return
      }
      const { data: savedRecord } = success
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, savedRecord?.$id]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
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
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updatedUser: UserUpdateData) =>
      await users.updateUser({ user: updatedUser }),
    onSuccess: success => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_USERS]
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

export const useCreateChatStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) =>
      await chatsMember.createChat({ userId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CHATS_BY_USER_ID]
      })
    }
  })
}
export const useCreateChatRoomFromUsers = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      users
    }: Parameters<typeof chatRooms.createChatRoomFromUsers>[0]) =>
      await chatRooms.createChatRoomFromUsers({ users }),
    onSuccess: response => {
      if (response?.data == null) {
        return
      }
      void queryClient.refetchQueries()
    }
  })
}
export const useDeleteChat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ chatId }: { chatId: string }) =>
      await chatsMember.deleteChat({ chatId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CHATS_BY_USER_ID]
      })
    }
  })
}

export const useCreateMessage = () => {
  return useMutation({
    mutationFn: async ({
      body,
      authorAccountId,
      authorChat,
      receiversChat,
      chatRoomId
    }: Parameters<typeof messages.createMessage>[0]) =>
      await messages.createMessage({
        body,
        authorChat,
        receiversChat,
        authorAccountId,
        chatRoomId
      })
  })
}

export const useSetMessagesReadToZero = () => {
  return useMutation({
    mutationFn: async ({
      chatId
    }: Parameters<typeof chatsMember.resetMessagesToRead>[0]) =>
      await chatsMember.resetMessagesToRead({ chatId })
  })
}

export const useEditMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      messageId,
      newBody
    }: Parameters<typeof messages.editMessage>[0]) =>
      await messages.editMessage({ messageId, newBody }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES]
      })
    }
  })
}
export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      messageId
    }: Parameters<typeof messages.deleteMessage>[0]) =>
      await messages.deleteMessage({ messageId }),
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES]
      })
    }
  })
}

export const useFollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      followedUserId,
      followerUserId
    }: Parameters<typeof follows.updateFollows>[0]) =>
      await follows.updateFollows({
        followerUserId,
        followedUserId
      }),
    onSuccess: data => {
      if (data != null) {
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        })
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_USER_BY_ID]
        })
      }
    }
  })
}

export const useUnfollow = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ followRecordId }: { followRecordId: string }) =>
      await follows.deleteFollow({ followRecordId }),
    onSuccess: data => {
      if (data != null) {
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        })
        void queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_USER_BY_ID]
        })
      }
    }
  })
}
