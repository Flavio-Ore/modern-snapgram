import { links } from '@/routes/links'
import { cn, extractFirstRoutePart } from '@shared/lib'
import { Link, useLocation, useParams } from 'react-router-dom'

export interface BottombarProps {
  className?: string
}

export const Bottombar = ({ className }: BottombarProps) => {
  const { pathname } = useLocation()
  const { id: userIdToChat } = useParams()

  return (
    <section
      className={cn(
        'z-50 flex items-center justify-between w-full sticky bottom-0 rounded-t-[20px] bg-dark-2 px-5 py-4 md:hidden',
        {
          hidden: userIdToChat != null
        },
        className
      )}
    >
      {links.bottom.map(({ Icon, label, route }) => (
        <Link
          key={`bottombar-${label}`}
          to={route}
          className={cn('flex-center flex-col gap-1 p-2 transition', {
            'bg-dark-4 rounded-[10px]':
              extractFirstRoutePart(pathname) === extractFirstRoutePart(route)
          })}
        >
          <Icon
            className={cn('size-6', {
              'fill-secondary-500':
                extractFirstRoutePart(pathname) === extractFirstRoutePart(route)
            })}
          />
        </Link>
      ))}
    </section>
  )
}

export default Bottombar
