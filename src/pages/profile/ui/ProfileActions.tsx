import { EditIcon, Loader, Button } from '@shared/ui'
import { type UserModel } from '@shared/types'
import { useFollow, useUnfollow } from '@features/follow-user'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export interface ProfileActionsProps {
  className?: string
  currentUser: UserModel
  profileUser: UserModel
}

export const ProfileActions = ({
  currentUser,
  profileUser,
  className
}: ProfileActionsProps) => {
  const [isFollowing, setIsFollowing] = useState(() => {
    return currentUser.followings?.some(
      record => record.followed?.$id === profileUser.$id
    ) ?? false
  })
  const { mutateAsync: follow, isPending: isPendingFollow } = useFollow()
  const { mutateAsync: unfollow, isPending: isPendingUnfollow } = useUnfollow()

  const followRecordId = useMemo(
    () =>
      currentUser.followings?.find(
        record => record.followed?.$id === profileUser.$id
      )?.$id ?? '',
    [currentUser, profileUser]
  )

  const isCurrentUser = useMemo(
    () => currentUser.accountId === profileUser.accountId,
    [currentUser, profileUser]
  )

  const handleFollow = async () => {
    if (isCurrentUser) return
    try {
      await follow({
        followerUserId: currentUser.$id,
        followedUserId: profileUser.$id
      })
      setIsFollowing(true)
    } catch (e) {
      console.error(e)
    }
  }

  const handleUnfollow = async () => {
    if (isCurrentUser) return
    try {
      await unfollow({ followRecordId })
      setIsFollowing(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={className}>
      {isCurrentUser && (
        <Link
          to='/update-profile'
          className='flex-center gap-2 small-medium py-2.5 px-5 bg-dark-3 hover:bg-light-4 rounded-lg transition'
        >
          <EditIcon className='size-5 fill-secondary-500' />
          Edit Profile
        </Link>
      )}
      {!isCurrentUser && (
        <>
          {!isFollowing && (
            <Button
              className='shad-button_primary px-5 py-2.5 hover:bg-secondary-500 hover:text-dark-1 small-medium'
              disabled={isPendingFollow || isPendingUnfollow}
              onClick={handleFollow}
            >
              {isPendingFollow || isPendingUnfollow ? <Loader /> : 'Follow'}
            </Button>
          )}
          {isFollowing && (
            <Button
              className='shad-button_primary bg-dark-4 px-5 py-2.5 hover:bg-red-600 small-medium'
              disabled={isPendingFollow || isPendingUnfollow}
              onClick={handleUnfollow}
            >
              {isPendingFollow || isPendingUnfollow ? <Loader /> : 'Unfollow'}
            </Button>
          )}
          <Button
            className='shad-button_ghost bg-light-1 text-dark-1 hover:bg-primary-600 small-semibold'
            asChild
          >
            <Link key='message' to='/chats'>
              Message
            </Link>
          </Button>
        </>
      )}
    </div>
  )
}

export default ProfileActions
