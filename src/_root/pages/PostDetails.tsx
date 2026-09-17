import { Link, useNavigate, useParams } from 'react-router-dom'

import Loader from '@/components/shared/app/Loader'
import GridPostList from '@/components/shared/posts/GridPostList'
import PostStats from '@/components/shared/posts/PostStats'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/useUserContext'
import { useDeletePost } from '@/lib/queries/mutations'

import { useGetPostById, useGetUserPosts } from '@/lib/queries/queries'
import { isObjectEmpty, multiFormatDateString } from '@/lib/utils'

const PostDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useUserContext()
  const { toast } = useToast()
  const { data: post, isLoading } = useGetPostById({ postId: id ?? '' })
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts({
    userId: post?.creator?.$id ?? ''
  })
  const { mutate: deletePost } = useDeletePost()

  if (isObjectEmpty(userPosts)) return <Loader />
  const relatedPosts = userPosts.documents.filter(
    userPost => userPost.$id !== id
  )

  const handleDeletePost = () => {
    deletePost({ postId: id ?? '', imageId: post?.imageId ?? '' })
    toast({
      title: 'Post deleted',
      description: 'Your post has been deleted successfully'
    })
    navigate(-1)
  }

  return (
    <div className='post_details-container'>
      <div className='hidden md:flex max-w-5xl w-full'>
        <Button
          onClick={() => { navigate(-1) }}
          variant='ghost'
          className='shad-button_ghost'
        >
          <img
            src={'/assets/icons/back.svg'}
            alt='back'
            width={24}
            height={24}
          />
          <p className='small-medium lg:base-medium'>Back</p>
        </Button>
      </div>

      {isLoading || post != null
        ? <Loader />
        : <div className='post_details-card'>
          <img
            src={post?.imageUrl}
            alt='Creator main post'
            className='post_details-img'
          />

          <div className='post_details-info'>
            <div className='flex-between w-full'>
              <Link
                to={`/profile/${post?.creator.$id}`}
                className='flex items-center gap-3'
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    '/assets/icons/profile-placeholder.svg'
                  }
                  alt='Creator profile picture'
                  height={48}
                  width={48}
                  className='rounded-full'
                />
                <div className='flex gap-1 flex-col'>
                  <p className='base-medium lg:body-bold text-light-1'>
                    {post?.creator.name}
                  </p>
                  <div className='flex-center gap-2 text-light-3'>
                    <p className='subtle-semibold lg:small-regular '>
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className='subtle-semibold lg:small-regular'>
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className='flex-center gap-4'>
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src={'/assets/icons/edit.svg'}
                    alt='Edit button'
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant='ghost'
                  className={`ost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'
                    }`}
                >
                  <img
                    src={'/assets/icons/delete.svg'}
                    alt='Delete button'
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
              <p>{post?.caption}</p>
              <ul className='flex gap-1 mt-2'>
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className='text-light-3 small-regular'
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      }

      <div className='w-full max-w-5xl'>
        <hr className='border w-full border-dark-4/80' />

        <h3 className='body-bold md:h3-bold w-full my-10'>
          More Related Posts
        </h3>
        {isUserPostLoading || relatedPosts !== null
          ? <Loader />
          : <GridPostList posts={relatedPosts} />
        }
      </div>
    </div>
  )
}

export default PostDetails
