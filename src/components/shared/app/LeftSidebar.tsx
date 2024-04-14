import ChatsIcon from '@/components/icons/ChatsIcon'
import CreatePostIcon from '@/components/icons/CreatePostIcon'
import ExploreIcon from '@/components/icons/ExploreIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import Logo from '@/components/icons/Logo'
import PeopleIcon from '@/components/icons/PeopleIcon'
import ReelsIcon from '@/components/icons/ReelsIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/useUserContext'
import { useSignOutAccount } from '@/lib/queries/mutations'
import { cn } from '@/lib/utils'
import { LucideLogOut, SettingsIcon } from 'lucide-react'
import { useEffect } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'

const links = {
  sidebar: [
    {
      Icon: HomeIcon,
      imgURL: '/assets/icons/home.svg',
      route: '/',
      label: 'Home'
    },
    {
      Icon: ExploreIcon,
      imgURL: '/assets/icons/wallpaper.svg',
      route: '/explore',
      label: 'Explore'
    },
    {
      Icon: PeopleIcon,
      imgURL: '/assets/icons/people.svg',
      route: '/all-users',
      label: 'People'
    },
    {
      Icon: SaveIcon,
      imgURL: '/assets/icons/bookmark.svg',
      route: '/saved',
      label: 'Saved'
    },
    {
      Icon: ReelsIcon,
      imgURL: '/assets/icons/reels.svg',
      route: '/reels',
      label: 'Reels'
    },
    {
      Icon: ChatsIcon,
      imgURL: '/assets/icons/chat.svg',
      route: '/chats',
      label: 'Chats'
    },
    {
      Icon: CreatePostIcon,
      imgURL: '/assets/icons/gallery-add.svg',
      route: '/create-post',
      label: 'Create Post'
    }
  ],
  bottom: [
    {
      Icon: HomeIcon,
      imgURL: '/assets/icons/home.svg',
      route: '/',
      label: 'Home'
    },
    {
      Icon: ExploreIcon,
      imgURL: '/assets/icons/wallpaper.svg',
      route: '/explore',
      label: 'Explore'
    },
    {
      Icon: SaveIcon,
      imgURL: '/assets/icons/bookmark.svg',
      route: '/saved',
      label: 'Saved'
    },
    {
      Icon: CreatePostIcon,
      imgURL: '/assets/icons/gallery-add.svg',
      route: '/create-post',
      label: 'Create'
    }
  ]
}

const LeftSidebar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isLoading } = useUserContext()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const { id: profileId } = useParams()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <nav className='leftsidebar w-[600px]'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <Logo className='w-full' />
        </Link>
        {isLoading && (
          <div className='flex items-center space-x-4'>
            <Skeleton className='min-h-14 min-w-14 rounded-full' />
            <div className='w-full space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-2 w-4/6' />
            </div>
          </div>
        )}
        {!isLoading && user != null && (
          <Link
            to={`/profile/${user.id}`}
            className={cn('relative flex gap-3 items-center', {
              'before:block before:bg-primary-500 before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full relative':
                profileId === user.id || pathname === '/update-profile'
            })}
          >
            <img
              src={user.imageUrl}
              alt='profile'
              height={56}
              width={56}
              className='rounded-full aspect-square'
            />
            <div className='flex flex-col max-w-40'>
              <p className='body-bold overflow-ellipsis'>{user.name}</p>
              <p className='small-regular text-light-3 overflow-ellipsis'>
                @{user.username}
              </p>
            </div>
          </Link>
        )}
        <ul className='flex flex-col gap-4'>
          {links.sidebar.map(({ Icon, route, label }) => (
            <li
              key={label}
              className={cn('leftsidebar-link group', {
                'bg-primary-500': pathname === route
              })}
            >
              <NavLink to={route} className='flex gap-4 items-center p-4'>
                <Icon
                  className={cn('size-6 group-hover:invert-white', {
                    'invert-white': pathname === route
                  })}
                />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <Button
          variant='ghost'
          className='shad-button_ghost small-medium lg:base-medium flex-start w-full h-12 group hover:bg-red'
          onClick={() => {
            signOut()
            navigate('/sign-in')
          }}
        >
          <LucideLogOut
            size={24}
            className='stroke-red group-hover:stroke-white'
          />
          Logout
        </Button>
        <Button
          variant='ghost'
          className='shad-button_ghost small-medium lg:base-medium flex-start w-full group hover:bg-primary-600  h-12'
        >
          <SettingsIcon
            size={24}
            className='stroke-primary-500 group-hover:stroke-secondary-500'
          />
          Settings
        </Button>
      </div>
    </nav>
  )
}

export default LeftSidebar
