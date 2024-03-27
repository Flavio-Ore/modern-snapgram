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
  EXPLORE_POSTS: 'EXPLORE_POSTS'
}
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
