import { cn } from '@/lib/utils'
import { type E_USERS } from '@/values'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const roleClassNames = {
  ALL_USERS: {
    card: '2xl:max-w-[303px] 2xl:max-h-[319px]',
    name: 'h3-bold',
    subtitle: 'body-medium',
    link: 'small-medium w-[110px] h-[38px] py-2.5 px-5'
  },
  TOP_CREATORS: {
    card: '2xl:max-w-[190px] 2xl:max-h-[190px]',
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
const UserCard: React.FC<UserCardProps> = ({
  profileLink,
  imgUrl,
  name,
  mainFollower,
  role
}) => {
  const classes = useMemo(() => roleClassNames[role], [role])
  return (
    <div className={cn('user-card', classes.card)}>
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
          'flex-center rounded-lg text-center bg-primary-500',
          classes.link
        )}
      >
        Follow
      </Link>
    </div>
  )
}
export default UserCard
