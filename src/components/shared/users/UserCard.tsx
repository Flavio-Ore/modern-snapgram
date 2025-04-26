import { cn } from '@/lib/utils'
import { type E_USERS } from '@/values/enums'
import { RedoIcon } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const roleClassNames = {
  ALL_USERS: {
    cardSize: '2xl:max-w-[303px] 2xl:max-h-[319px]',
    name: 'body-bold',
    subtitle: 'base-semibold',
    link: 'small-medium w-[110px] h-[38px] py-2.5 px-5'
  },
  TOP_CREATORS: {
    cardSize: '2xl:max-w-[190px] 2xl:max-h-[190px]',
    name: 'base-semibold',
    subtitle: 'small-medium',
    link: 'subtle-semibold py-1.5 px-[18px]'
  }
}

interface UserCardModel {
  profileLink: string
  imgUrl: string
  name: string
  mainFollower: string
  role: string
}
type UserCardProps = UserCardModel & {
  role: keyof typeof E_USERS
}
const UserCard = ({
  profileLink,
  imgUrl,
  name,
  mainFollower,
  role
}: UserCardProps) => {
  const classes = useMemo(() => roleClassNames[role], [role])
  return (
    <div
      className={cn(
        'user-card transition-[background-color] group hover:bg-dark-2',
        classes.cardSize
      )}
    >
      <img
        src={imgUrl}
        alt={name}
        height={role === 'ALL_USERS' ? 90 : role === 'TOP_CREATORS' ? 54 : 100}
        width={role === 'ALL_USERS' ? 90 : role === 'TOP_CREATORS' ? 54 : 100}
        className='rounded-full aspect-square object-cover'
        loading='lazy'
      />
      <div className='flex-center flex-col gap-0.5'>
        <h3 className={cn('overflow-ellipsis', classes.name)}>
          {name ?? 'Not found'}
        </h3>
        <p className={cn('overflow-ellipsis text-light-3', classes.subtitle)}>
          {mainFollower ?? 'Not found'}
        </p>
      </div>
      <Link
        to={profileLink}
        className={cn(
          'px-5 py-2.5 small-medium flex-center rounded-lg text-center bg-dark-4 group-hover:bg-secondary-500/90 group-hover:text-dark-1 hover:opacity-80',
          classes.link
        )}
      >
        Visit
        <RedoIcon size={16} className='ml-1' />
      </Link>
    </div>
  )
}
export default UserCard
