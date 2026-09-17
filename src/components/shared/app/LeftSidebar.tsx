import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/useUserContext'
import { useSignOutAccount } from '@/lib/queries/mutations'
import { cn, truncateRoute } from '@/lib/utils'
import { type INavLink } from '@/types'
import { sidebarLinks } from '@/values'
import { useEffect } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'

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
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={170}
            height={36}
          />
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
            className={cn(
              'relative flex gap-3 items-center',
              (profileId === user.id || pathname === '/update-profile') &&
                'before:block before:bg-primary-500 before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full relative'
            )}
          >
            <img
              src={user.imageUrl ?? '/assets/icons/profile-placeholder.svg'}
              alt='profile'
              height={56}
              width={56}
              className='rounded-full aspect-square'
            />
            <div className='flex flex-col max-w-[190px]'>
              <p className='body-bold text-overflow-ellipsis'>{user.name}</p>
              <p className='small-regular text-light-3 text-overflow-ellipsis'>
                @{user.username}
              </p>
            </div>
          </Link>
        )}
        <ul className='flex flex-col gap-4'>
          {sidebarLinks.map(({ imgURL, label, route }: INavLink) => {
            const isActive = truncateRoute(pathname) === route
            return (
              <li
                key={label}
                className={cn(
                  'leftsidebar-link group',
                  isActive && 'bg-primary-500'
                )}
              >
                <NavLink to={route} className='flex gap-4 items-center p-4'>
                  <img
                    src={imgURL}
                    alt={label}
                    height={21.5}
                    width={21.5}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  {label}
                </NavLink>
              </li>
            )
          })}
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
          <img
            src='/assets/icons/logout.svg'
            alt='logout'
            height={21.5}
            width={21.5}
            className='group-hover:invert-white'
          />
          Logout
        </Button>
        <Button
          variant='ghost'
          className='shad-button_ghost small-medium lg:base-medium flex-start w-full group hover:bg-primary-600 h-12'
        >
          <img
            src='/assets/icons/settings.svg'
            alt='settings'
            height={21.5}
            width={21.5}
            className='group-hover:invert-white'
          />
          Settings
        </Button>
      </div>
    </nav>
  )
}

export default LeftSidebar
