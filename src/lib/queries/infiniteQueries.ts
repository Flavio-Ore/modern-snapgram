import { QUERY_KEYS } from '@/lib/queries/queryKeys'
import { follows, messages, posts, saves, users } from '@/services/appwrite'
import { useInfiniteQuery } from '@tanstack/react-query'

const INITIAL_PAGE_PARAM = ''
const enabledId = (id: string) =>
  id != null && id.trim().length !== 0 && id !== ''
const getNextCursor = (lastPage: any) => {
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

export const useGetInfiniteMessages = ({
  senderId,
  receiversId
}: {
  senderId: string
  receiversId: string[]
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_MESSAGES, senderId, ...receiversId],
    queryFn: async ({ pageParam }) =>
      await messages.findInfiniteMessages({
        lastId: pageParam,
        senderId,
        receiversId
      }),
    enabled: enabledId(senderId),
    getNextPageParam: getNextCursor,
    initialPageParam: INITIAL_PAGE_PARAM
  })
}
