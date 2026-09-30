export const PUBLIC_ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up'
} as const

export const USER_ROUTES = {
  SAVED: '/saved',
  CHATS: '/chats',
  CHATS_ROOM: '/chats/:chatRoomId',
  CREATE_POST: '/create-post',
  UPDATE_POST: '/update-post/:id',
  PROFILE: '/profile/:id/*',
  UPDATE_PROFILE: '/update-profile',
  HOME: '/home',
  EXPLORE: '/explore',
  PEOPLE: '/all-users',
  ALL_USERS: '/all-users',
  POST_DETAILS: '/posts/:id',
  NOT_FOUND: '*'
} as const

export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...USER_ROUTES
} as const
