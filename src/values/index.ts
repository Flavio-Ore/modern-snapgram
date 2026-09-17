import ChatsIcon from '@/components/icons/ChatsIcon'
import CreatePostIcon from '@/components/icons/CreatePostIcon'
import ExploreIcon from '@/components/icons/ExploreIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import PeopleIcon from '@/components/icons/PeopleIcon'
import ReelsIcon from '@/components/icons/ReelsIcon'
import SaveIcon from '@/components/icons/SaveIcon'

export enum E_USERS {
  ALL_USERS = 'ALL_USERS',
  TOP_CREATORS = 'TOP_CREATORS'
}

export enum E_FORM_ACTIONS {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}
export const OPERATIONS = {
  SEARCH_POSTS: 'SEARCH_POSTS',
  EXPLORE_POSTS: 'EXPLORE_POSTS',
  SAVED_POSTS: 'SAVED_POSTS',
  PEOPLE: 'PEOPLE'
}

const ROUTES = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  PUBLIC_ROUTES: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up'
  },
  PRIVATE_ROUTES: {
    HOME: '/',
    EXPLORE: '/explore',
    PEOPLE: '/all-users',
    SAVED: '/saved',
    REELS: '/reels',
    CHATS: '/chats',
    CHATS_ROOM: '/chats/:id',
    CREATE_POST: '/create-post',
    UPDATE_POST: '/update-post/:id',
    POST_DETAILS: '/posts/:id',
    PROFILE: '/profile/:id/*',
    UPDATE_PROFILE: '/update-profile',
    NOT_FOUND: '*'
  }
}
export const { PRIVATE_ROUTES, PUBLIC_ROUTES } = ROUTES

export const links = {
  sidebar: [
    {
      Icon: HomeIcon,
      route: '/',
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
      Icon: ReelsIcon,
      route: '/reels',
      label: 'Reels'
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
      route: '/',
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
    },

    {
      Icon: ChatsIcon,
      route: '/chats',
      label: 'Chats'
    }
  ]
}
