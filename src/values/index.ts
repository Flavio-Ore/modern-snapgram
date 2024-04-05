import { SavedCollections, SavedPosts, SavedReels } from '@/_root/pages/Saved'
import { TabsTriggers } from '@/types'

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

export const SAVES_TRIGGERS: TabsTriggers[] = [
  {
    trigger: 'Posts',
    icon: '/assets/icons/posts.svg',
    Element: SavedPosts
  },
  {
    trigger: 'Reels',
    icon: '/assets/icons/reels.svg',
    Element: SavedReels
  },
  {
    trigger: 'Collections',
    icon: '/assets/icons/collections.svg',
    Element: SavedCollections
  }
]

export const PROFILES_TRIGGERS: TabsTriggers[] = [
  {
    trigger: 'Posts',
    icon: '/assets/icons/posts.svg',
    Element: SavedPosts
  },
  {
    trigger: 'Reels',
    icon: '/assets/icons/reels.svg',
    Element: SavedReels
  },
  {
    trigger: 'Tagged',
    icon: '/assets/icons/tagged.svg',
    Element: SavedCollections
  }
]

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
    CREATE_POST: '/create-post',
    UPDATE_POST: '/update-post/:id',
    POST_DETAILS: '/posts/:id',
    PROFILE: '/profile/:id/*',
    UPDATE_PROFILE: '/update-profile',
    NOT_FOUND: '*'
  }
}
export const { PRIVATE_ROUTES, PUBLIC_ROUTES } = ROUTES

export const sidebarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore'
  },
  {
    imgURL: '/assets/icons/people.svg',
    route: '/all-users',
    label: 'People'
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved'
  },
  {
    imgURL: '/assets/icons/reels.svg',
    route: '/reels',
    label: 'Reels'
  },
  {
    imgURL: '/assets/icons/chat.svg',
    route: '/chats',
    label: 'Chats'
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create Post'
  }
]

export const bottombarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/assets/icons/wallpaper.svg',
    route: '/explore',
    label: 'Explore'
  },
  {
    imgURL: '/assets/icons/bookmark.svg',
    route: '/saved',
    label: 'Saved'
  },
  {
    imgURL: '/assets/icons/gallery-add.svg',
    route: '/create-post',
    label: 'Create'
  }
]
