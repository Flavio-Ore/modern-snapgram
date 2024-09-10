import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import {
  chatsMember,
  follows,
  messages,
  posts,
  saves,
  users
} from '@/services/appwrite'
import { type AppwriteResponse } from '@/services/appwrite/util'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type Models } from 'appwrite'

const INITIAL_PAGE_PARAM = ''
const enabledId = (id: string) =>
  id != null && id.trim().length !== 0 && id !== ''
const getNextCursor = <T extends Models.Document>(
  lastPage: AppwriteResponse<T[]> | null
) => {
  if (lastPage?.data == null) return null
  return lastPage.data.length === 0
    ? null
    : lastPage.data[lastPage.data.length - 1].$id
}

export const useGetInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USERS],
    queryFn: async ({ pageParam }) =>
      await users.findInfiniteRecentUsers({
        lastId: pageParam
      }),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteSearchedUsers = ({
  searchTerm
}: {
  searchTerm: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_USERS, searchTerm],
    queryFn: async ({ pageParam }) =>
      await users.findInfiniteSearchedUsers({
        lastId: pageParam,
        searchTerm
      }),
    enabled: enabledId(searchTerm),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteRecentPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_RECENT_POSTS],
    queryFn: async ({ pageParam }) =>
      await posts.findInfiniteRecentPosts({
        lastId: pageParam
      }),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export function useGetInfinitePosts () {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_UPDATED_POSTS],
    queryFn: async ({ pageParam }) =>
      await posts.findInfiniteUpdatedPosts({
        lastId: pageParam
      }),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteSearchedPosts = ({
  searchTerm
}: {
  searchTerm: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SEARCHED_POSTS, searchTerm],
    queryFn: async ({ pageParam }) =>
      await posts.findInfiniteSearchedPosts({
        lastId: pageParam,
        searchTerm
      }),
    enabled: enabledId(searchTerm),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
export const useGetInfiniteUserPosts = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_USER_POSTS, userId],
    queryFn: async ({ pageParam }) =>
      await posts.findInfinitePostsByUserId({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteRelatedPosts = ({
  postId,
  userId
}: {
  postId: string
  userId: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_RELATED_POSTS, postId, userId],
    queryFn: async ({ pageParam }) =>
      await posts.findInfiniteRelatedPostsByUserIdAndPostIdToExclude({
        lastId: pageParam,
        postId,
        userId
      }),
    enabled: enabledId(postId) && enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteSavedPosts = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_SAVED_POSTS, userId],
    queryFn: async ({ pageParam }) =>
      await saves.findInfiniteSaves({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteFollowings = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWINGS, userId],
    queryFn: async ({ pageParam }) =>
      await follows.findInfiniteFollowings({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteFollowers = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_FOLLOWERS, userId],
    queryFn: async ({ pageParam }) =>
      await follows.findInfiniteFollowers({
        lastId: pageParam,
        userId
      }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteChats = ({ userId }: { userId: string }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_CHATS_MEMBER, userId],
    queryFn: async ({ pageParam }) =>
      await chatsMember.findInfiniteChats({ userId, lastId: pageParam }),
    enabled: enabledId(userId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteMessagesByChatRoomId = ({
  chatRoomId
}: {
  chatRoomId: string
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES_BY_CHAT_ROOM_ID, chatRoomId],
    queryFn: async ({ pageParam }) =>
      await messages.findInfiniteMessagesByChatRoomId({
        lastId: pageParam,
        chatRoomId
      }),
    enabled: enabledId(chatRoomId),
    select: infiniteData => {
      const responsesInDisarray = infiniteData.pages.map(response => {
        if (response?.data == null) {
          return response
        }
        const messagesInDisorder = structuredClone(response.data)
        return {
          ...response,
          data: messagesInDisorder.reverse()
        }
      })
      return {
        pages: responsesInDisarray.reverse(),
        pageParams: infiniteData.pageParams
      }
    },
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

export const useGetInfiniteMessagesByAuthorsAndReceivers = ({
  authorChatId,
  receiversChatId
}: {
  authorChatId: string
  receiversChatId: string[]
}) => {
  return useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.GET_INFINITE_MESSAGES_BY_AUTHORS_AND_RECEIVERS,
      authorChatId,
      ...receiversChatId
    ],
    queryFn: async ({ pageParam }) =>
      await messages.findInfiniteMessagesByAuthorsAndReceivers({
        lastId: pageParam,
        receiversChatId,
        authorChatId
      }),
    enabled:
      enabledId(authorChatId) && receiversChatId.some(id => enabledId(id)),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}

// export const useGetInfiniteMessages = ({
//   senderId,
//   receiversId
// }: {
//   senderId: string
//   receiversId: string[]
// }) => {
//   return useInfiniteQuery({
//     queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES, senderId, ...receiversId],
//     queryFn: async ({ pageParam }) =>
//       await messages.findInfiniteMessages({
//         lastId: pageParam,
//         authorChatId: senderId,
//         receiversChatId: receiversId
//       }),
//     select: infiniteData => {
//       const responsesInDisarray = infiniteData.pages.map(
//         response => {
//           if (response?.data == null) {
//             return response
//           }
//           const messagesInDisorder = structuredClone(response.data)
//           return {
//             ...response,
//             data: messagesInDisorder.reverse()
//           }
//         }
//       )
//       return {
//         pages: responsesInDisarray.reverse(),
//         pageParams: infiniteData.pageParams
//       } satisfies typeof infiniteData
//     },
//     enabled: enabledId(senderId) && receiversId.some(id => enabledId(id)),
//     getNextPageParam: getNextCursor,
//     initialPageParam: INITIAL_PAGE_PARAM
//   })
// }
