import { useUserContext } from '@/context/useUserContext'
import { useSignOutAccount } from '@/lib/queries/mutations'
import { INavLink } from '@/types'
import { sidebarLinks } from '@/values'
import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const truncateRoute = (route: string) => {
  return route.split('/').slice(0, 2).join('/')
}

const LeftSidebar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { mutate: signOut, isSuccess } = useSignOutAccount()

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
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt='profile'
            className='h-14 w-14 rounded-full aspect-square'
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
                    className={`h-[21.5px] w-[21.5px] aspect-square group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                    src={imgURL}
                    alt={label}
                  />
                  {label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='flex-start flex-col'>
        <Button variant='ghost' className='shad-button_ghost'>
          <img src='/assets/icons/settings.svg' alt='settings' />
          <p className='small-medium lg:base-medium'>Settings</p>
        </Button>
        <Button
          variant='ghost'
          className='shad-button_ghost'
          onClick={() => {
            signOut()
            navigate('/sign-in')
          }}
        >
          <img src='/assets/icons/logout.svg' alt='logout' />
          <p className='small-medium lg:base-medium'>Logout</p>
        </Button>
      </div>
    </nav>
  )
}

export default LeftSidebar
