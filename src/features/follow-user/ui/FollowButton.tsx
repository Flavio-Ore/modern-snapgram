import Loader from '@/components/Loader'
import { cn } from '@shared/lib/cn'
import { Button } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useFollow, useUnfollow } from '../model/useUpdateFollows'

export interface FollowButtonProps {
  targetUserId: string
  currentUserId: string
  isInitiallyFollowing?: boolean
  followRecordId?: string
  className?: string
  onFollowChange?: (isFollowing: boolean) => void
}

export const FollowButton = ({
  targetUserId,
  currentUserId,
  isInitiallyFollowing = false,
  followRecordId = '',
  className,
  onFollowChange
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing)
  const [currentFollowRecordId, setCurrentFollowRecordId] =
    useState(followRecordId)

  const { mutateAsync: follow, isPending: isPendingFollow } = useFollow()
  const { mutateAsync: unfollow, isPending: isPendingUnfollow } = useUnfollow()

  useEffect(() => {
    setIsFollowing(isInitiallyFollowing)
    setCurrentFollowRecordId(followRecordId)
  }, [isInitiallyFollowing, followRecordId])

  const isBusy = isPendingFollow || isPendingUnfollow
  const isSelf = currentUserId === targetUserId

  if (isSelf) return null

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollow({ followRecordId: currentFollowRecordId })
        setIsFollowing(false)
        onFollowChange?.(false)
      } else {
        const response = await follow({
          followerUserId: currentUserId,
          followedUserId: targetUserId
        })
        if (response?.data?.$id) {
          setCurrentFollowRecordId(response.data.$id)
        }
        setIsFollowing(true)
        onFollowChange?.(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Button
      onClick={handleFollowToggle}
      disabled={isBusy}
      className={cn(
        'small-medium px-5 py-2.5 transition',
        isFollowing
          ? 'shad-button_primary bg-dark-4 hover:bg-red-600'
          : 'shad-button_primary hover:bg-secondary-500 hover:text-dark-1',
        className
      )}
    >
      {isBusy ? <Loader /> : isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  )
}

export default FollowButton
