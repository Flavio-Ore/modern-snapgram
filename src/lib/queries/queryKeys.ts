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
  GET_INFINITE_USER_POSTS: 'useGetInfiniteUserPosts',

  //  SEARCH KEYS
  GET_INFINITE_SEARCHED_POSTS: 'findInfiniteSearchedPosts',
  GET_INFINITE_SEARCHED_USERS: 'findInfiniteSearchedUsers',

  // SAVED POSTS KEYS
  GET_SAVED_RECORD: 'getSavedRecord',
  GET_INFINITE_SAVED_POSTS: 'findInfiniteSaves',
  GET_SAVED_COLLECTIONS: 'getSavedCollections',

  // MESSAGE KEYS
  GET_INFINITE_MESSAGES: 'findInfiniteMessages'
}
