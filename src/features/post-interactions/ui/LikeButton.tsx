import { Button } from '@shared/ui'
import { HeartIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLikePost } from '../model/useLikePost'

export interface LikeButtonProps {
  postId: string
  likes?: string[]
  userId: string
  className?: string
}

export const LikeButton = ({
  postId,
  likes = [],
  userId,
  className
}: LikeButtonProps) => {
  const [currentLikes, setCurrentLikes] = useState<string[]>(likes)
  const { mutate: like, isPending } = useLikePost()

  const isLiked = useMemo(
    () => currentLikes.includes(userId),
    [currentLikes, userId]
  )

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const nextLikes = isLiked
      ? currentLikes.filter(id => id !== userId)
      : [...currentLikes, userId]

    setCurrentLikes(nextLikes)
    like({ postId, likesArray: nextLikes })
  }

  return (
    <div className={className}>
      {isPending ? (
        <HeartIcon
          size={20}
          className='fill-red-500/50 stroke-red-500/50 animate-float cursor-not-allowed'
        />
      ) : (
        <Button
          variant='ghost'
          onClick={handleLike}
          className='gap-x-2 px-2 text-light-1 hover:text-white'
        >
          {isLiked ? (
            <HeartIcon
              className='fill-red-500 stroke-red-500 hover:fill-red-500/50'
              size={20}
            />
          ) : (
            <HeartIcon
              className='fill-none stroke-primary-500 hover:fill-red-500/50 hover:stroke-red-500/50'
              size={20}
            />
          )}
          <span className='small-medium lg:base-medium'>
            {currentLikes.length}
          </span>
        </Button>
      )}
    </div>
  )
}

export default LikeButton
