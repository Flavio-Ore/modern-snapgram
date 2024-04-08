import { bottombarLinks } from '@/values'
import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const { pathname } = useLocation()
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map(({ imgURL, label, route }) => {
        const isActive = pathname === route
        return (
          <Link
            key={`bottombar-${label}`}
            to={route}
            className={`${
              isActive && 'bg-primary-500 rounded-[10px]'
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              className={`${isActive && 'invert-white'}`}
              width={16}
              height={16}
              src={imgURL}
              alt={label}
            />
            <p className='tiny-medium text-light-2'>{label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default Bottombar
