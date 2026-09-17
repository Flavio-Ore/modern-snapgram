import { SavedCollections, SavedPosts, SavedReels } from '@/components/shared/saves'
import { type TabsTriggers } from '@/types'

export const SAVES_TRIGGERS: TabsTriggers[] = [
  {
    trigger: 'Posts',
    icon: '/assets/icons/posts.svg',
    Element: <SavedPosts />
  },
  {
    trigger: 'Reels',
    icon: '/assets/icons/reels.svg',
    Element: <SavedReels />
  },
  {
    trigger: 'Collections',
    icon: '/assets/icons/collections.svg',
    Element: <SavedCollections />
  }
]

export const PROFILES_TRIGGERS: TabsTriggers[] = [
  {
    trigger: 'Posts',
    icon: '/assets/icons/posts.svg',
    Element: <SavedPosts />
  },
  {
    trigger: 'Reels',
    icon: '/assets/icons/reels.svg',
    Element: <SavedReels />
  },
  {
    trigger: 'Tagged',
    icon: '/assets/icons/tagged.svg',
    Element: <SavedCollections />
  }
]
