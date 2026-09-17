import { cn } from '@/lib/utils'
import { links } from '@/values'
import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const { pathname } = useLocation()
  return (
    <section className='bottom-bar'>
      {links.bottom.map(({ Icon, label, route }) => (
        <Link
          key={`bottombar-${label}`}
          to={route}
          className={cn('flex-center flex-col gap-1 p-2 transition', {
            'bg-primary-500 rounded-[10px]': pathname === route
          })}
        >
          <Icon
            className={cn('size-4', { 'invert-white': pathname === route })}
          />
          <p className='tiny-medium text-light-2'>{label}</p>
        </Link>
      ))}
    </section>
  )
}

export default Bottombar
