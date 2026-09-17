import SavedIcon from '@/components/icons/SavedIcon'
import SaveIcon from '@/components/icons/SaveIcon'

import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost
} from '@/lib/queries/mutations'
import { useUser } from '@/lib/queries/queries'
import { type Post, type UserModel } from '@/types'
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
  const { data: currentUser, isLoading, isRefetching } = useUser()
  const { $id: postId } = post
  console.log('currentUser.saves :>> ', currentUser)
  console.log('post :>> ', post)
  console.log('likes :>> ', likes)
  const savedRecordId = useMemo(
    () =>
      currentUser?.saves?.find(record => record.post.$id === postId)?.$id ?? '',
    [currentUser]
  )
  const likesCount = useMemo(() => likes.length, [likes])
  console.log('savedRecordId :>> ', savedRecordId)
  useEffect(() => {
    setIsSaved(savedRecordId !== '')
  }, [savedRecordId])

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
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
    <div className='flex justify-between item-center z-20'>
      <div className='flex gap-2 mr-5'>
        {(isLoading || isRefetching || isLiking) && (
          <HeartIcon
            size={20}
            className='fill-red-500/50 stroke-red-500/50 animate-float cursor-not-allowed'
          />
        )}
        {!isLoading && !isRefetching && !isLiking && (
          <div onClick={handleLikePost} className='flex-center cursor-pointer'>
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
          </div>
        )}
        <p className='small-medium lg:base-medium'>{likesCount}</p>
      </div>
      <div className='flex gap-2'>
        {(isLoading || isRefetching || isSaving || isDeletingSave) && (
          <BookmarkIcon
            size={20}
            className='fill-primary-500/50 stroke-primary-500/50 animate-float cursor-not-allowed'
          />
        )}
        {!isLoading && !isRefetching && !isSaving && !isDeletingSave && (
          <button
            onClick={handleSavePost}
            className='flex-center cursor-pointer'
          >
            {isSaved
              ? (
              <SavedIcon className='hover:fill-primary-500/50' />
                )
              : (
              <SaveIcon className='hover:fill-primary-500/50' />
                )}
          </button>
        )}
      </div>
    </div>
  )
}
export default PostStats
