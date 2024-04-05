import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost
} from '@/lib/queries/mutations'
import { useGetCurrentUser } from '@/lib/queries/queries'
import { checkIsLiked } from '@/lib/utils'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'
import Loader from '../app/Loader'

interface PostStatsModel {
  post: Models.Document
  userId: string
}

type PostStatsProps = PostStatsModel

const PostStats: React.FC<PostStatsProps> = ({ post, userId }) => {
  const likesList: string[] = post.likes.map(
    (user: Models.Document) => user.$id
  )
  const { $id: postId } = post
  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost, isPending: isSavingPost } = useSavePost()
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost()

  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === postId
  )

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser])

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()

    let usersLikes = [...likes]

    if (usersLikes.includes(userId))
      usersLikes = usersLikes.filter(id => id !== userId)
    else usersLikes.push(userId)

    setLikes(usersLikes)
    likePost({ postId, usersLikes })
  }
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (savedPostRecord) {
      setIsSaved(false)
      return void deleteSavedPost({ savedRecordId: savedPostRecord.$id })
    }
    savePost({ userId, postId })
    setIsSaved(true)
  }

  // const containerStyles = location.pathname.startsWith('/profile')
  //   ? 'w-full'
  //   : ''

  return (
    <div className='flex justify-between item-center z-20'>
      <div className='flex gap-2 mr-5'>
        <img
          src={
            checkIsLiked(likes, userId)
              ? '/assets/icons/liked.svg'
              : '/assets/icons/like.svg'
          }
          alt='Icon to be displayed when a post is liked'
          loading='lazy'
          width={20}
          height={20}
          onClick={handleLikePost}
          className='cursor-pointer'
        />
        <p className='small-medium lg:base-medium'>{likes.length}</p>
      </div>
      <div className='flex gap-2'>
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            alt='Icon to be displayed when a post is save'
            loading='lazy'
            width={20}
            height={20}
            onClick={handleSavePost}
            className='cursor-pointer'
          />
        )}
      </div>
    </div>
  )
}
export default PostStats
