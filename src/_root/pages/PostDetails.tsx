import BackIcon from '@/components/icons/BackIcon'
import DeleteIcon from '@/components/icons/DeleteIcon'
import EditIcon from '@/components/icons/EditIcon'
import GridPostList from '@/components/shared/posts/GridPostList'
import PostStats from '@/components/shared/posts/PostStats'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import PostDetailsSkeleton from '@/components/shared/skeletons/PostDetailsSkeleton'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useDeletePost } from '@/lib/queries/mutations'
import { useGetPostById, useGetUserPosts, useUser } from '@/lib/queries/queries'
import { cn, multiFormatDateString } from '@/lib/utils'
import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: user } = useUser()
  const { toast } = useToast()
  const {
    data: post,
    isLoading,
    isError
  } = useGetPostById({ postId: id ?? '' })
  const {
    data: userPosts,
    isLoading: isRelatedLoading,
    isError: isRelatedError
  } = useGetUserPosts({
    userId: post?.creator?.$id ?? ''
  })
  const { mutate: deletePost } = useDeletePost()
  const isCreator = useMemo(
    () =>
      user == null || post == null ? false : user.$id === post.creator.$id,
    [user, post]
  )
  const userId = useMemo(() => user?.$id ?? '', [user])

  console.log('user :>> ', user)
  console.log('post creator :>> ', post?.creator)
  console.log('user.id === post?.creator?.$id :>> ', isCreator)
  const relatedPosts = useMemo(
    () => userPosts?.filter(userPost => userPost.$id !== id) ?? null,
    [userPosts]
  )

  const handleDeletePost = () => {
    if (!isCreator) return
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
          onClick={() => {
            navigate(-1)
          }}
          variant='ghost'
          className='shad-button_ghost group'
        >
          <BackIcon className='size-6 group-hover:fill-primary-500/50' />
          <p className='small-medium lg:base-medium'>Back</p>
        </Button>
      </div>

      {isLoading && <PostDetailsSkeleton />}
      {isError && (
        <h3 className='h2-bold text-secondary-500'>
          Oops... Error loading post!
        </h3>
      )}
      {!isError && !isLoading && post == null && (
        <h3 className='h2-bold'>Post not found</h3>
      )}
      {!isError && !isLoading && post != null && (
        <div className='post_details-card'>
          <img
            src={post.imageUrl}
            alt='Creator main post'
            className='post_details-img'
          />

          <div className='post_details-info'>
            <div className='flex-between w-full'>
              <Link
                to={`/profile/${post.creator.$id}`}
                className='flex items-center gap-3'
              >
                <img
                  src={post.creator.imageUrl}
                  alt='Creator profile picture'
                  height={48}
                  width={48}
                  className='rounded-full aspect-square object-cover'
                />
                <div className='flex gap-1 flex-col'>
                  <p className='base-medium lg:body-bold text-light-1'>
                    {post.creator.name}
                  </p>
                  <div className='flex-center gap-2 text-light-3'>
                    <p className='subtle-semibold lg:small-regular '>
                      {multiFormatDateString(post.$createdAt)}
                    </p>
                    •
                    <p className='subtle-semibold lg:small-regular'>
                      {post.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div
                className={cn('gap-4', {
                  'flex-center': isCreator,
                  hidden: !isCreator
                })}
              >
                <Link to={`/update-post/${post.$id}`}>
                  <EditIcon className='size-6 hover:fill-primary-500/50' />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant='ghost'
                  className='post_details-delete_btn'
                >
                  <DeleteIcon className='size-6 hover:fill-red-500/50' />
                </Button>
              </div>
            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
              <p>{post.caption}</p>
              <ul className='flex gap-1 mt-2'>
                {post.tags.map((tag, index) => (
                  <li
                    key={`${tag}-${index}`}
                    className='text-light-3 small-regular'
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post} userId={userId} />
            </div>
          </div>
        </div>
      )}

      <div className='w-full max-w-5xl'>
        <hr className='border w-full border-dark-4/80' />

        <h3 className='body-bold md:h3-bold w-full my-10'>
          More Related Posts
        </h3>
        {(isLoading || isRelatedLoading) && <GridPostSkeleton />}
        {isRelatedError && (
          <h4 className='h3-bold animate-pulse text-secondary-500  text-center'>
            Oops... Error loading related posts!
          </h4>
        )}
        {!isRelatedLoading &&
          !isRelatedError &&
          relatedPosts != null &&
          relatedPosts.length === 0 && (
            <h4 className='h3-bold animate-pulse text-primary-600/80  text-center '>
              No related posts...
            </h4>
        )}
        {!isRelatedLoading && !isRelatedError && relatedPosts != null && (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  )
}

export default PostDetails
