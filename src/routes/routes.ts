const ROUTES = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  PUBLIC_ROUTES: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up'
  },
  PRIVATE_ROUTES: {
    HOME: '/home',
    EXPLORE: '/explore',
    PEOPLE: '/all-users',
    SAVED: '/saved',
    CHATS: '/chats',
    CHATS_ROOM: '/chats/:chatRoomId',
    CREATE_POST: '/create-post',
    UPDATE_POST: '/update-post/:id',
    POST_DETAILS: '/posts/:id',
    PROFILE: '/profile/:id/*',
    UPDATE_PROFILE: '/update-profile',
    NOT_FOUND: '*'
  }
}
export const { PRIVATE_ROUTES, PUBLIC_ROUTES } = ROUTES
