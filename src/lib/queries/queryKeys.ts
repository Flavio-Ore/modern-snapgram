export const QUERY_KEYS = {
  // USER KEYS
  GET_CURRENT_USER: 'getUser',
  GET_USER_BY_ID: 'findUserById',
  GET_TOP_CREATORS: 'findAllUsers',

  // INFINITE USER KEYS
  GET_INFINITE_USERS: 'findInfiniteUsers',

  // INFINITE FOLLOWERS - FOLLOWING
  GET_INFINITE_FOLLOWERS: 'findInfiniteFollowers',
  GET_INFINITE_FOLLOWINGS: 'findInfiniteFollowings',

  // POST KEYS
  GET_POSTS: 'getPosts',
  GET_POST_BY_ID: 'getPostById',

  // INFINITE POST KEYS
  GET_INFINITE_UPDATED_POSTS: 'findInfiniteUpdatedPosts',
  GET_INFINITE_RECENT_POSTS: 'findInfiniteRecentPosts',
  GET_INFINITE_RELATED_POSTS:
    'findInfiniteRelatedPostsByUserIdAndPostIdToExclude',
  GET_INFINITE_USER_POSTS: 'useGetInfiniteUserPosts',

  //  SEARCH KEYS
  GET_INFINITE_SEARCHED_POSTS: 'findInfiniteSearchedPosts',
  GET_INFINITE_SEARCHED_USERS: 'findInfiniteSearchedUsers',

  // SAVED POSTS KEYS
  GET_SAVED_RECORD: 'getSavedRecord',
  GET_INFINITE_SAVED_POSTS: 'findInfiniteSaves',
  GET_SAVED_COLLECTIONS: 'getSavedCollections',

  // MESSAGE KEYS
  GET_INFINITE_MESSAGES: 'findInfiniteMessages',
  GET_INFINITE_MESSAGES_BY_AUTHORS_AND_RECEIVERS:
    'findInfiniteMessagesByAuthorsAndReceivers',
  GET_INFINITE_MESSAGES_BY_CHAT_ROOM_ID: 'findInfiniteMessagesByChatRoomId',
  GET_MESSAGES_NOTIFICATIONS: 'useMessagesNotifications',

  // CHAT ROOM KEYS
  GET_ALL_CHATS_BY_USER_ID: 'findAllChatRoomsByUserId',
  GET_ALL_CHATS_BY_MEMBER_ID: 'findAllChatRoomsByMemberId',
  GET_CHAT_ROOM_BY_ID: 'findChatRoomById',
  GET_CHAT_ROOMS_BY_IDS: 'findChatRoomsByIds',

  // MEMBER KEYS
  GET_ALL_MEMBER_CHATS_BY_USER_ID: 'findAllMemberChatsByUserId',
  GET_ALL_CHATS_MEMBER: 'findAllChats',
  GET_INFINITE_CHATS_MEMBER: 'findInfiniteChats'
}
