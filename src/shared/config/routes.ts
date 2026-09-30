import {
  ChatsIcon,
  CreatePostIcon,
  ExploreIcon,
  HomeIcon,
  PeopleIcon,
  SaveIcon
} from '../ui/icons'

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
  POST_DETAILS: '/posts/:id',
  NOT_FOUND: '*'
} as const

export const links = {
  sidebar: [
    {
      Icon: HomeIcon,
      route: '/home',
      label: 'Home'
    },
    {
      Icon: ExploreIcon,
      route: '/explore',
      label: 'Explore'
    },
    {
      Icon: PeopleIcon,
      route: '/all-users',
      label: 'People'
    },
    {
      Icon: SaveIcon,
      route: '/saved',
      label: 'Saved'
    },
    {
      Icon: ChatsIcon,
      route: '/chats',
      label: 'Chats'
    },
    {
      Icon: CreatePostIcon,
      route: '/create-post',
      label: 'Create Post'
    }
  ],
  bottom: [
    {
      Icon: HomeIcon,
      route: '/home',
      label: 'Home'
    },
    {
      Icon: ExploreIcon,
      route: '/explore',
      label: 'Explore'
    },
    {
      Icon: CreatePostIcon,
      route: '/create-post',
      label: 'Create'
    },
    {
      Icon: SaveIcon,
      route: '/saved',
      label: 'Saved'
    }
  ]
}
