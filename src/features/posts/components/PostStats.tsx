import SavedIcon from '@/components/icons/SavedIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import { type Post, type UserModel } from '@/types'
import { useSessionUser } from '@auth/hooks/useSessionUser'
import { useLikePost } from '@posts/hooks/useLikePost'
import { useDeleteSavedPost } from '@saved/hooks/useDeleteSavedPost'
import { useSavePost } from '@saved/hooks/useSavePost'
import { Button } from '@shadcn/button'
import { BookmarkIcon, HeartIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface PostStatsProps {
  post: Post
  userId: UserModel['$id']
}
const PostStats = ({ post, userId }: PostStatsProps) => {
  const [likes, setLikes] = useState(() => {
    if (post?.likes == null || post.likes.length === 0) return []
    return post.likes.map(user => user.$id)
  })
  const [isSaved, setIsSaved] = useState(false)
  const { mutate: like, isPending: isLiking } = useLikePost()
  const { mutate: save, isPending: isSaving } = useSavePost()
  const { mutate: deleteSave, isPending: isDeletingSave } = useDeleteSavedPost()
  const { data: currentUser, isLoading, isRefetching } = useSessionUser()
  const { $id: postId } = post

  const savedRecordId = useMemo(
    () =>
      currentUser?.saves?.find(record => record.post.$id === postId)?.$id ?? '',
    [currentUser]
  )
  const likesCount = useMemo(() => likes.length, [likes])
  useEffect(() => {
    setIsSaved(savedRecordId !== '')
  }, [savedRecordId])

  const handleLikePost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    let usersLikes = [...likes]
    if (usersLikes.includes(userId)) {
      usersLikes = usersLikes.filter(id => id !== userId)
    } else usersLikes.push(userId)

    setLikes(usersLikes)
    like({ postId, usersLikes })
  }
  const handleSavePost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (savedRecordId !== '') {
      setIsSaved(false)
      deleteSave({ savedRecordId })
      return
    }
    setIsSaved(true)
    save({ postId, userId })
  }
  return (
    <div className='flex-between z-20'>
      <div className='flex-center'>
        {(isLoading || isRefetching || isLiking) && (
          <HeartIcon
            size={20}
            className='fill-red-500/50 stroke-red-500/50 animate-float cursor-not-allowed'
          />
        )}
        {!isLoading && !isRefetching && !isLiking && (
          <Button
            variant='ghost'
            onClick={handleLikePost}
            className='gap-x-2 px-2'
          >
            {likes.includes(userId)
              ? (
              <HeartIcon
                className='fill-red-500 stroke-red-500 hover:fill-red-500/50'
                size={20}
              />
                )
              : (
              <HeartIcon
                className='fill-none stroke-primary-500 hover:fill-red-500/50 hover:stroke-red-500/50'
                size={20}
              />
                )}
            <span className='small-medium lg:base-medium'>{likesCount}</span>
          </Button>
        )}
      </div>
      <div className='flex gap-2'>
        {(isLoading || isRefetching || isSaving || isDeletingSave) && (
          <BookmarkIcon
            size={20}
            className='fill-primary-500/50 stroke-primary-500/50 animate-float cursor-not-allowed'
          />
        )}
        {!isLoading && !isRefetching && !isSaving && !isDeletingSave && (
          <Button variant='ghost' onClick={handleSavePost} className='px-2'>
            {isSaved
              ? (
              <SavedIcon className='hover:fill-primary-500/50' />
                )
              : (
              <SaveIcon className='hover:fill-primary-500/50' />
                )}
          </Button>
        )}
      </div>
    </div>
  )
}
export default PostStats
