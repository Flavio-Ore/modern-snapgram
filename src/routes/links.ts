import ChatsIcon from '@/components/icons/ChatsIcon'
import CreatePostIcon from '@/components/icons/CreatePostIcon'
import ExploreIcon from '@/components/icons/ExploreIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import PeopleIcon from '@/components/icons/PeopleIcon'
import SaveIcon from '@/components/icons/SaveIcon'

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
