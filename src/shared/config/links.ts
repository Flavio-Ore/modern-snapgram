import {
  ChatsIcon,
  CreatePostIcon,
  ExploreIcon,
  HomeIcon,
  PeopleIcon,
  SaveIcon
} from '../ui/icons'
import { ROUTES } from './routes'

export interface NavLinkItem {
  Icon: React.ComponentType<{ className?: string }>
  route: string
  label: string
}

export interface LinksConfig {
  sidebar: NavLinkItem[]
  bottom: NavLinkItem[]
}

export const links: LinksConfig = {
  sidebar: [
    {
      Icon: HomeIcon,
      route: ROUTES.HOME,
      label: 'Home'
    },
    {
      Icon: ExploreIcon,
      route: ROUTES.EXPLORE,
      label: 'Explore'
    },
    {
      Icon: PeopleIcon,
      route: ROUTES.ALL_USERS,
      label: 'People'
    },
    {
      Icon: SaveIcon,
      route: ROUTES.SAVED,
      label: 'Saved'
    },
    {
      Icon: ChatsIcon,
      route: ROUTES.CHATS,
      label: 'Chats'
    },
    {
      Icon: CreatePostIcon,
      route: ROUTES.CREATE_POST,
      label: 'Create Post'
    }
  ],
  bottom: [
    {
      Icon: HomeIcon,
      route: ROUTES.HOME,
      label: 'Home'
    },
    {
      Icon: ExploreIcon,
      route: ROUTES.EXPLORE,
      label: 'Explore'
    },
    {
      Icon: CreatePostIcon,
      route: ROUTES.CREATE_POST,
      label: 'Create'
    },
    {
      Icon: SaveIcon,
      route: ROUTES.SAVED,
      label: 'Saved'
    }
  ]
}
