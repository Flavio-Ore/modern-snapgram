import { useSessionUser } from '@entities/user'
import { cn } from '@shared/lib/cn'
import type { Post } from '@shared/types'
import { useMemo } from 'react'
import { DeletePostDialog } from './DeletePostDialog'
import { LikeButton } from './LikeButton'
import { SaveButton } from './SaveButton'

export interface PostInteractionsProps {
  post: Post
  userId?: string
  showDelete?: boolean
  className?: string
  onDeleteSuccess?: () => void
}

export const PostInteractions = ({
  post,
  userId: propUserId,
  showDelete = false,
  className,
  onDeleteSuccess
}: PostInteractionsProps) => {
  const { data: sessionUser } = useSessionUser()
  const effectiveUserId = propUserId ?? sessionUser?.$id ?? ''

  const likesIds = useMemo(() => {
    if (!post?.likes || post.likes.length === 0) return []
    return post.likes.map(user => (typeof user === 'string' ? user : user.$id))
  }, [post?.likes])

  const savedRecordId = useMemo(() => {
    return (
      sessionUser?.saves?.find(record => record.post.$id === post.$id)?.$id ??
      ''
    )
  }, [sessionUser, post.$id])

  const isCreator = useMemo(() => {
    if (!sessionUser || !post?.creator) return false
    return sessionUser.$id === post.creator.$id
  }, [sessionUser, post?.creator])

  const filesId = useMemo(() => {
    return post?.files?.map(file => file?.$id ?? '') ?? []
  }, [post?.files])

  return (
    <div className={cn('flex-between z-20 w-full', className)}>
      <LikeButton
        postId={post.$id}
        likes={likesIds}
        userId={effectiveUserId}
      />

      <div className='flex items-center gap-2'>
        {showDelete && isCreator && (
          <DeletePostDialog
            postId={post.$id}
            filesId={filesId}
            onSuccess={onDeleteSuccess}
          />
        )}
        <SaveButton
          postId={post.$id}
          userId={effectiveUserId}
          savedRecordId={savedRecordId}
        />
      </div>
    </div>
  )
}

export default PostInteractions
