import EditIcon from '@/components/icons/EditIcon'
import PostStats from '@/components/shared/posts//PostStats'
import PostsSlider from '@/components/shared/posts/PostsCarousel'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, multiFormatDateString } from '@/lib/utils'
import { useSessionUser } from '@/states/TanStack-query/hooks/queries/session/useSessionUser'
import { type Post } from '@/types'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface PostCardProps {
  post: Post | undefined | null
}
const PostCard = ({ post }: PostCardProps) => {
  const { data: user } = useSessionUser()
  const userId = useMemo(() => user?.$id ?? '', [user])
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
  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3 overflow-ellipsis'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ??
                '/assets/icons/profile-placeholder.svg'
              }
              alt='profile of the owner of the post'
              height={48}
              width={48}
              className='rounded-full size-12 object-cover'
            />
          </Link>
          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1 overflow-ellipsis'>
              {post.creator.name}
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

        <Link
          to={`/update-post/${post.$id}`}
          className={cn({
            hidden: userId !== post.creator.$id
          })}
        >
          <EditIcon className='size-5 hover:fill-secondary-500' />
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
      </Link>
      <PostsSlider files={post.files} />

      <PostStats post={post} userId={userId} />
    </div>
  )
}

export default PostCard
