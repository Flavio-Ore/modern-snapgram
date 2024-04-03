export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = 'createUserAccount',

  // USER KEYS
  GET_CURRENT_USER = 'getCurrentUser',
  GET_USERS = 'getUsers',
  GET_USER_BY_ID = 'getUserById',

  // POST KEYS
  GET_POSTS = 'getPosts',
  GET_INFINITE_POSTS = 'getInfinitePosts',
  GET_RECENT_POSTS = 'getRecentPosts',
  GET_POST_BY_ID = 'getPostById',
  GET_USER_POSTS = 'getUserPosts',
  GET_FILE_PREVIEW = 'getFilePreview',

  //  SEARCH KEYS
  SEARCH_POSTS = 'getSearchPosts',

  // SAVED POSTS KEYS
  GET_SAVED_POSTS = 'getSavedPosts',
  GET_SAVED_REELS = 'getSavedReels',
  GET_SAVED_COLLECTIONS = 'getSavedCollections'
}
