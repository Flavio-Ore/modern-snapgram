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
