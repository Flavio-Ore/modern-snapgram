import SavedIcon from '@/components/icons/SavedIcon'
import SaveIcon from '@/components/icons/SaveIcon'

import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost
} from '@/lib/queries/mutations'
import { useUser } from '@/lib/queries/queries'
import { checkIsLiked, isObjectEmpty } from '@/lib/utils'
import { type Post } from '@/types'
import { BookmarkIcon, HeartIcon } from 'lucide-react'
import { type FC, useEffect, useMemo, useState } from 'react'

interface PostStatsProps {
  post: Post
  userId: string
}
const PostStats: FC<PostStatsProps> = ({ post, userId }) => {
  const [likes, setLikes] = useState(() => {
    if (post?.likes == null || isObjectEmpty(post)) return []
    return post.likes.map(user => user.$id)
  })
  const [isSaved, setIsSaved] = useState(false)
  const { mutate: like, isPending: isLiking } = useLikePost()
  const { mutate: save, isPending: isSaving } = useSavePost()
  const { mutate: deleteSave, isPending: isDeletingSave } = useDeleteSavedPost()
  const { data: currentUser, isLoading, isRefetching } = useUser()
  const { $id: postId } = post
  const saveRecordId = useMemo(
    () =>
      currentUser?.save?.find(record => record.post.$id === postId)?.$id ?? '',
    [currentUser]
  )
  useEffect(() => {
    setIsSaved(saveRecordId !== '')
  }, [saveRecordId])

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
    if (saveRecordId !== '') {
      setIsSaved(false)
      deleteSave({ savedRecordId: saveRecordId })
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
            className='fill-red/50 stroke-red/50 animate-float cursor-not-allowed'
          />
        )}
        {!isLoading && !isRefetching && !isLiking && (
          <div onClick={handleLikePost} className='flex-center cursor-pointer'>
            {checkIsLiked(likes, userId)
              ? (
              <HeartIcon
                className='fill-red stroke-red hover:fill-red/50'
                size={20}
              />
                )
              : (
              <HeartIcon
                className='fill-none stroke-primary-500 hover:fill-red/50 hover:stroke-red/50'
                size={20}
              />
                )}
          </div>
        )}
        <p className='small-medium lg:base-medium'>{likes.length}</p>
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
