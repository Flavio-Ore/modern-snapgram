import Logo from '@/components/icons/Logo'
import LogoSmall from '@/components/icons/LogoSmall'
import LogoutDialog from '@/components/LogoutDialog'
import { links } from '@/routes/links'
import { cn } from '@/utils/cn'
import { extractFirstRoutePart } from '@/utils/extractFirstRoutePart'
import { useSessionUser } from '@auth/hooks/useSessionUser'
import { useUpdateSessionUser } from '@auth/hooks/useUpdateSessionUser'
import { Skeleton } from '@shadcn/skeleton'
import { useEffect } from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'

const LeftSidebar = ({
  totalMessagesToRead = 0
}: {
  totalMessagesToRead?: number
}) => {
  const { pathname } = useLocation()
  const { data: user, isLoading, isError, refetch } = useSessionUser()
  const { isSuccess: userUpdate } = useUpdateSessionUser()
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
              className={cn('leftsidebar-link relative group base-regular', {
                'bg-dark-4 before:block before:bg-primary-500 before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full':
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
                {route.includes('/chats')
                  ? (
                  <div className='relative'>
                    <Icon
                      className={cn('size-6 group-hover:fill-secondary-500', {
                        'fill-secondary-500':
                          extractFirstRoutePart(pathname) ===
                          extractFirstRoutePart(route)
                      })}
                    />
                    {route.includes('/chats') && (
                      <div className='absolute text-dark-1 subtle-regular bg-secondary-500 size-4 text-center pb-4 rounded-sm shadow-[0px_0px_6px_0.5px_#FFB620] shadow-secondary-500 -top-2 -right-2.5'>
                        {totalMessagesToRead}
                      </div>
                    )}
                  </div>
                    )
                  : (
                  <Icon
                    className={cn('size-6 group-hover:fill-secondary-500', {
                      'fill-secondary-500':
                        extractFirstRoutePart(pathname) ===
                        extractFirstRoutePart(route)
                    })}
                  />
                    )}

                <span className='relative hidden xl:inline'>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-2 mt-12'>
        <LogoutDialog />
        {/* <Button
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
        </Button> */}
      </div>
    </nav>
  )
}

export default LeftSidebar
