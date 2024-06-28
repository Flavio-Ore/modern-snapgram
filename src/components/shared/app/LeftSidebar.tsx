import Logo from '@/components/icons/Logo'
import LogoSmall from '@/components/icons/LogoSmall'
import LogoutDialog from '@/components/shared/app/LogoutDialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUpdateUser } from '@/lib/queries/mutations'
import { useUser } from '@/lib/queries/queries'
import { cn, extractFirstRoutePart } from '@/lib/utils'
import { links } from '@/values'
import { SettingsIcon } from 'lucide-react'
import { useEffect } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useParams
} from 'react-router-dom'

const LeftSidebar = () => {
  const { pathname } = useLocation()
  const { data: user, isLoading, isError, refetch } = useUser()
  const { isSuccess: userUpdate } = useUpdateUser()
  const { id: profileId } = useParams()

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (userUpdate) refetch()
  }, [userUpdate])

  return (
    <nav className='leftsidebar min-w-20 xl:min-w-56 '>
      <div className='flex flex-col gap-8'>
        <Link to='/' className='gap-3 items-center hidden xl:flex'>
          <Logo className='w-full' />
        </Link>
        <Link to='/' className='gap-3 items-center flex xl:hidden'>
          <LogoSmall className='w-full' />
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
        {!isLoading && !isError && user != null && (
          <Link
            to={`/profile/${user.$id}`}
            className={cn('flex gap-3 items-center', {
              'relative before:block before:bg-primary-500 before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full':
                profileId === user.$id || pathname === '/update-profile'
            })}
          >
            <img
              src={user.imageUrl}
              alt='profile'
              height={56}
              width={56}
              className='rounded-full aspect-square object-cover'
            />
            <div className='flex-col max-w-40 hidden xl:flex'>
              <p className='body-bold overflow-ellipsis'>{user.name}</p>
              <p className='small-regular text-light-3 overflow-ellipsis'>
                @{user.username}
              </p>
            </div>
          </Link>
        )}
        <ul className='flex flex-col gap-2'>
          {links.sidebar.map(({ Icon, route, label }) => (
            <li
              key={label}
              className={cn('leftsidebar-link group base-regular', {
                'bg-dark-4 relative before:block before:bg-primary-500 before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full':
                  extractFirstRoutePart(pathname) ===
                  extractFirstRoutePart(route)
              })}
            >
              <NavLink
                to={route}
                className={cn(
                  'flex gap-4 justify-center xl:justify-start items-center py-4 xl:p-4',
                  {
                    'body-bold':
                      extractFirstRoutePart(pathname) ===
                      extractFirstRoutePart(route)
                  }
                )}
              >
                <Icon
                  className={cn('size-6 group-hover:fill-secondary-500', {
                    'fill-secondary-500':
                      extractFirstRoutePart(pathname) ===
                      extractFirstRoutePart(route)
                  })}
                />
                <span className='hidden xl:inline'>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-2 mt-12'>
        <LogoutDialog />
        <Button
          variant='ghost'
          className='flex gap-x-3 w-full justify-center xl:justify-start items-center p-0 xl:px-4 hover:bg-primary-600'
        >
          <SettingsIcon
            size={24}
            strokeWidth={1.1}
            className='stroke-primary-500 group-hover:stroke-secondary-500'
          />
          <span className='hidden xl:inline group-hover:text-secondary-500 small-regular'>
            Settings
          </span>
        </Button>
      </div>
    </nav>
  )
}

export default LeftSidebar
