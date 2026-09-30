import { cn } from '@shared/lib/cn'
import { RedoIcon } from 'lucide-react'
import { type ReactNode, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { UserAvatar } from './UserAvatar'

export type UserCardVariant = 'ALL_USERS' | 'TOP_CREATORS'

const roleClassNames = {
  ALL_USERS: {
    cardSize: '2xl:max-w-[303px] 2xl:max-h-[319px]',
    name: 'body-bold',
    subtitle: 'base-semibold',
    link: 'small-medium w-[110px] h-[38px] py-2.5 px-5',
    avatarSize: 'xl' as const
  },
  TOP_CREATORS: {
    cardSize: '2xl:max-w-[190px] 2xl:max-h-[190px]',
    name: 'base-semibold',
    subtitle: 'small-medium',
    link: 'subtle-semibold py-1.5 px-[18px]',
    avatarSize: 'lg' as const
  }
} as const

export interface UserCardProps {
  profileLink?: string
  imgUrl?: string
  name: string
  mainFollower?: string
  username?: string
  role?: UserCardVariant | string
  actionSlot?: ReactNode
  children?: ReactNode
  className?: string
}

export const UserCard = ({
  profileLink = '',
  imgUrl,
  name,
  mainFollower,
  username,
  role = 'ALL_USERS',
  actionSlot,
  children,
  className
}: UserCardProps) => {
  const isTopCreator = role === 'TOP_CREATORS'
  const classes = useMemo(
    () => (isTopCreator ? roleClassNames.TOP_CREATORS : roleClassNames.ALL_USERS),
    [isTopCreator]
  )

  const subtitle = mainFollower ?? (username ? `@${username}` : null)

  return (
    <div
      className={cn(
        'user-card transition-[background-color] group hover:bg-dark-2',
        classes.cardSize,
        className
      )}
    >
      <UserAvatar
        src={imgUrl}
        name={name}
        alt={name}
        size={classes.avatarSize}
      />

      <div className='flex-center flex-col gap-0.5 text-center'>
        <h3 className={cn('overflow-ellipsis text-light-1', classes.name)}>
          {name || 'Not found'}
        </h3>
        {subtitle && (
          <p className={cn('overflow-ellipsis text-light-3', classes.subtitle)}>
            {subtitle}
          </p>
        )}
      </div>

      {actionSlot ?? children ?? (
        profileLink ? (
          <Link
            to={profileLink}
            className={cn(
              'px-5 py-2.5 small-medium flex-center rounded-lg text-center bg-dark-4 group-hover:bg-secondary-500/90 group-hover:text-dark-1 hover:opacity-80 text-light-1',
              classes.link
            )}
          >
            Visit
            <RedoIcon size={16} className='ml-1' />
          </Link>
        ) : null
      )}
    </div>
  )
}

export default UserCard
