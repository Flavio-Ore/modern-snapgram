import EditIcon from '@/components/icons/EditIcon'
import Loader from '@/components/Loader'
import { type UserModel } from '@/types'
import { useCreateChatRoomFromUsers } from '@chats/hooks/useCreateChatRoomFromUsers'
import { useFollow } from '@following-followers/hooks/useFollow'
import { useUnfollow } from '@following-followers/hooks/useUnfollow'
import { Button } from '@shadcn/button'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

interface ProfileButtonProps {
  className?: string
  currentUser: UserModel
  profileUser: UserModel
}
const ProfileActions = ({
  currentUser,
  profileUser,
  className
}: ProfileButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(() => {
    return currentUser.followings.some(
      record => record.followed.$id === profileUser.$id
    )
  })
  const { mutateAsync: createChatRoomFromUsers } = useCreateChatRoomFromUsers()
  const { mutateAsync: follow, isPending: isPendindFollow } = useFollow()
  const { mutateAsync: unfollow, isPending: isPendindUnfollow } = useUnfollow()
  const followRecordId = useMemo(
    () =>
      currentUser.followings.find(
        record => record.followed.$id === profileUser.$id
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
      console.error({ e })
    }
  }
  const handleUnfollow = async () => {
    if (isCurrentUser) return
    try {
      await unfollow({ followRecordId })
      setIsFollowing(false)
    } catch (e) {
      console.error({ e })
    }
  }
  const handleNewChat = async () => {
    if (isCurrentUser) return
    try {
      await createChatRoomFromUsers({
        users: [currentUser, profileUser]
      })
    } catch (e) {
      console.error({ e })
    }
  }
  return (
    <div className={className}>
      {isCurrentUser && (
        <Link
          to='/update-profile'
          className='flex-center gap-2 small-medium py-2.5  px-5 bg-dark-3 hover:bg-light-4 rounded-lg transition'
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
              disabled={isPendindFollow || isPendindUnfollow}
              onClick={handleFollow}
            >
              {isPendindFollow || isPendindUnfollow ? <Loader /> : 'Follow'}
            </Button>
          )}
          {isFollowing && (
            <Button
              className='shad-button_primary bg-dark-4 px-5 py-2.5 hover:bg-red-600 small-medium'
              disabled={isPendindFollow || isPendindUnfollow}
              onClick={handleUnfollow}
            >
              {isPendindFollow || isPendindUnfollow ? <Loader /> : 'Unfollow'}
            </Button>
          )}
          <Button
            className='shad-button_ghost bg-light-1 text-dark-1 hover:bg-primary-600 small-semibold'
            asChild
          >
            <Link key='message' to='/chats' onClick={handleNewChat}>
              Message
            </Link>
          </Button>
        </>
      )}
    </div>
  )
}

export default ProfileActions
