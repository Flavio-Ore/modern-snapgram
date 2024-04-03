import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/useUserContext'
import { useSignOutAccount } from '@/lib/queries/mutations'
import { INavLink } from '@/types'
import { sidebarLinks } from '@/values'
import { useEffect } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'

const truncateRoute = (route: string) => {
  return route.split('/').slice(0, 2).join('/')
}

const LeftSidebar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useUserContext()
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
        <Link
          to={`/profile/${user.id}`}
          className={`relative flex gap-3 items-center ${
            profileId === user.id || pathname === '/update-profile'
              ? 'before:block before:bg-primary-500 before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full relative'
              : ''
          }`}
        >
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            height={56}
            width={56}
            className='rounded-full aspect-square'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-4'>
          {sidebarLinks.map(({ imgURL, label, route }: INavLink) => {
            const isActive = truncateRoute(pathname) === route
            return (
              <li
                key={label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
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
