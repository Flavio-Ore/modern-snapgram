import type { Post } from '../model/types'
import { cn } from '@shared/lib/cn'
import { Button } from '@shared/ui'
import SavedIcon from '@shared/ui/icons/SavedIcon'
import SaveIcon from '@shared/ui/icons/SaveIcon'
import { BookmarkIcon, HeartIcon } from 'lucide-react'
import type React from 'react'

export interface PostStatsProps {
  post?: Post
  likesCount?: number
  isLiked?: boolean
  isSaved?: boolean
  isLoading?: boolean
  isLiking?: boolean
  isSaving?: boolean
  onLike?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export const PostStats = ({
  post,
  likesCount: customLikesCount,
  isLiked = false,
  isSaved = false,
  isLoading = false,
  isLiking = false,
  isSaving = false,
  onLike,
  onSave,
  className
}: PostStatsProps) => {
  const count = customLikesCount ?? post?.likes?.length ?? 0
  const isBusy = isLoading || isLiking
  const isSaveBusy = isLoading || isSaving

  return (
    <div className={cn('flex-between z-20', className)}>
      <div className='flex-center'>
        {isBusy ? (
          <HeartIcon
            size={20}
            className='fill-red-500/50 stroke-red-500/50 animate-float cursor-not-allowed'
          />
        ) : (
          <Button
            variant='ghost'
            onClick={onLike}
            className='gap-x-2 px-2 text-light-1'
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
            <span className='small-medium lg:base-medium'>{count}</span>
          </Button>
        )}
      </div>

      <div className='flex gap-2'>
        {isSaveBusy ? (
          <BookmarkIcon
            size={20}
            className='fill-primary-500/50 stroke-primary-500/50 animate-float cursor-not-allowed'
          />
        ) : (
          <Button variant='ghost' onClick={onSave} className='px-2 text-light-1'>
            {isSaved ? (
              <SavedIcon className='hover:fill-primary-500/50' />
            ) : (
              <SaveIcon className='hover:fill-primary-500/50' />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export default PostStats
