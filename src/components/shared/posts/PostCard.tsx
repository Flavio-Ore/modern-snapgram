import PostStats from '@/components/shared/posts//PostStats'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/useUserContext'
import { isObjectEmpty, multiFormatDateString } from '@/lib/utils'
import { type Post } from '@/types'
import { Link } from 'react-router-dom'

interface PostCardProps {
  post: Post | null
}
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useUserContext()
  if (post == null || isObjectEmpty(post?.creator) || post.creator?.name == null || post.tags == null) {
    return <div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
  }// Radix Skeleton
  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${post.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ??
                '/assets/icons/profile-placeholder.svg'
              }
              alt='profile of the owner of the post'
              className='rounded-full w-12 lg:h-12'
            />
          </Link>
          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>
              {post.creator.name}
            </p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular'>
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className='subtle-semibold lg:small-regular'>
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user?.id !== post.creator.$id && 'hidden'}`}
        >
          <img
            src='/assets/icons/edit.svg'
            alt='link to edit post'
            width={20}
            height={20}
          />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className='small-medium sm:base-medium py-5'>
          <p>{post.caption}</p>
          <ul className='flex gap-1 mt-2'>
            {post.tags.map((tag: string) => (
              <li key={tag} className='text-light-3'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl ?? '/assets/icons/profile-placeholder.svg'}
          alt='post image'
          className='post-card_img'
        />
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard
