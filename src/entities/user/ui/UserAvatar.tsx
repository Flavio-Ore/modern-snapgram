import { cn } from '@shared/lib/cn'
import ProfilePlaceholderIcon from '@shared/ui/icons/ProfilePlaceholderIcon'
import { useState } from 'react'

export type UserAvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface UserAvatarProps {
  src?: string | null
  alt?: string
  name?: string
  isOnline?: boolean
  showStatus?: boolean
  size?: UserAvatarSize
  className?: string
}

const sizeClasses: Record<UserAvatarSize, { container: string; text: string; dot: string }> = {
  sm: {
    container: 'w-8 h-8',
    text: 'text-xs',
    dot: 'w-2 h-2'
  },
  md: {
    container: 'w-10 h-10',
    text: 'text-sm',
    dot: 'w-2.5 h-2.5'
  },
  lg: {
    container: 'w-14 h-14',
    text: 'text-base',
    dot: 'w-3 h-3'
  },
  xl: {
    container: 'w-20 h-20',
    text: 'text-lg',
    dot: 'w-3.5 h-3.5'
  }
}

const getInitials = (label?: string): string => {
  if (!label || label.trim().length === 0) return ''
  const parts = label.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

export const UserAvatar = ({
  src,
  alt = 'User avatar',
  name,
  isOnline,
  showStatus = false,
  size = 'md',
  className
}: UserAvatarProps) => {
  const [imageError, setImageError] = useState(false)
  const currentSize = sizeClasses[size]
  const initials = getInitials(name || alt)
  const hasValidImage = Boolean(src) && !imageError

  return (
    <div className={cn('relative inline-flex flex-shrink-0 select-none items-center justify-center', currentSize.container, className)}>
      {hasValidImage ? (
        <img
          src={src ?? ''}
          alt={alt}
          onError={() => { setImageError(true) }}
          className='size-full rounded-full object-cover'
          loading='lazy'
        />
      ) : initials ? (
        <div className={cn('flex size-full items-center justify-center rounded-full bg-dark-4 font-semibold text-light-1', currentSize.text)}>
          {initials}
        </div>
      ) : (
        <div className='flex size-full items-center justify-center rounded-full bg-dark-4 overflow-hidden'>
          <ProfilePlaceholderIcon />
        </div>
      )}

      {showStatus && isOnline !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-dark-1',
            currentSize.dot,
            isOnline ? 'bg-green-500' : 'bg-light-4'
          )}
          aria-label={isOnline ? 'Online' : 'Offline'}
        />
      )}
    </div>
  )
}
