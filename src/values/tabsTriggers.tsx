import CollectionsIcon from '@/components/icons/CollectionsIcon'
import PostsIcon from '@/components/icons/PostsIcon'
import ReelsIcon from '@/components/icons/ReelsIcon'
import { SavedCollections, SavedPosts, SavedReels } from '@/components/shared/saves'
import { type TabsTriggers } from '@/types'

export const SAVES_TRIGGERS: TabsTriggers[] = [
  {
    trigger: 'Posts',
    Icon: <PostsIcon className='stroke-primary-500'/>,
    Element: <SavedPosts />
  },
  {
    trigger: 'Reels',
    Icon: <ReelsIcon className='fill-primary-500'/>,
    Element: <SavedReels />
  },
  {
    trigger: 'Collections',
    Icon: <CollectionsIcon className='fill-primary-500'/>,
    Element: <SavedCollections />
  }
]

export const PROFILES_TRIGGERS: TabsTriggers[] = [
  {
    trigger: 'Posts',
    Icon: <PostsIcon className='stroke-primary-500'/>,
    Element: <SavedPosts />
  },
  {
    trigger: 'Reels',
    Icon: <ReelsIcon className='fill-primary-500'/>,
    Element: <SavedReels />
  },
  {
    trigger: 'Collections',
    Icon: <CollectionsIcon className='fill-primary-500'/>,
    Element: <SavedCollections />
  }
]

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
