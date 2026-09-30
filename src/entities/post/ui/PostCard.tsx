import type { Post } from '../model/types'
import { cn } from '@shared/lib/cn'
import { multiFormatDateString } from '@shared/lib/multiFormatDateString'
import { Skeleton } from '@shared/ui'
import EditIcon from '@shared/ui/icons/EditIcon'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PostMediaCarousel } from './PostMediaCarousel'
import { PostStats } from './PostStats'

export interface PostCardProps {
  post: Post | undefined | null
  currentUserId?: string
  statsSlot?: ReactNode
  isLiked?: boolean
  isSaved?: boolean
  onLike?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLiking?: boolean
  isSaving?: boolean
  className?: string
}

export const PostCard = ({
  post,
  currentUserId = '',
  statsSlot,
  isLiked,
  isSaved,
  onLike,
  onSave,
  isLiking,
  isSaving,
  className
}: PostCardProps) => {
  if (post == null) {
    return (
      <div className='flex flex-col space-y-3'>
        <Skeleton className='h-[125px] w-[250px] rounded-xl' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    )
  }

  const isOwner = Boolean(currentUserId && currentUserId === post.creator?.$id)

  return (
    <div className={cn('post-card', className)}>
      <div className='flex-between'>
        <div className='flex items-center gap-3 overflow-ellipsis'>
          <Link to={`/profile/${post.creator?.$id}`}>
            <img
              src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile of the owner of the post'
              height={48}
              width={48}
              className='size-12 rounded-full object-cover'
              loading='lazy'
            />
          </Link>
          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1 overflow-ellipsis'>
              {post.creator?.name}
            </p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular'>
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className='subtle-semibold lg:small-regular overflow-ellipsis'>
                {post.location}
              </p>
            </div>
          </div>
        </div>

        {isOwner && (
          <Link to={`/update-post/${post.$id}`}>
            <EditIcon className='size-5 hover:fill-secondary-500' />
          </Link>
        )}
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className='small-medium sm:base-medium py-5'>
          <p className='text-light-1'>{post.caption}</p>
          <ul className='flex gap-1 mt-2'>
            {post.tags.map((tag: string) => (
              <li key={tag} className='text-light-3'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <PostMediaCarousel files={post.files ?? []} />

      {statsSlot ?? (
        <PostStats
          post={post}
          isLiked={isLiked}
          isSaved={isSaved}
          onLike={onLike}
          onSave={onSave}
          isLiking={isLiking}
          isSaving={isSaving}
        />
      )}
    </div>
  )
}

export default PostCard
