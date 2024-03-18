import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost
} from '@/lib/queries/queriesAndMutations'
import { checkIsLiked } from '@/lib/utils'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'
import Loader from './Loader'
interface PostStatsModel {
  post: Models.Document
  userId: string
}

type PostStatsProps = PostStatsModel

const PostStats: React.FC<PostStatsProps> = ({ post, userId }) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id)

  const [likes, setLikes] = useState<string[]>(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost, isPending: isSavingPost } = useSavePost()
  const { mutate: deleteSavePost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost()

  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  )

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser])

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()

    let likesArray = [...likes]

    if (likesArray.includes(userId))
      likesArray = likesArray.filter(id => id !== userId)
    else likesArray.push(userId)

    setLikes(likesArray)
    likePost({ postId: post.$id, likesArray })
  }
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (savedPostRecord) {
      setIsSaved(false)
      return deleteSavePost(savedPostRecord.$id)
    }
    savePost({ userId, postId: post.$id })
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
