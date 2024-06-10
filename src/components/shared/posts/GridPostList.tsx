import PostStats from '@/components/shared/posts/PostStats'
import { useUser } from '@/lib/queries/queries'
import { type Post } from '@/types'
import { Link } from 'react-router-dom'

interface GridPostListProps {
  posts: Post[]
  showUser?: boolean
  showStats?: boolean
}
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true
}: GridPostListProps) => {
  const { data: user } = useUser()
  console.log('posts :>> ', posts)
  return (
    <ul className='grid-container'>
      {posts.map(post => (
        <li key={post.$id} className='relative'>
          <Link to={`/posts/${post?.$id}`} className='grid-post_link'>
            {post?.files?.length > 0 &&
            post.files[0].mimeType === 'video/mp4'
              ? (
              <video
                src={post.files[0].url ?? '/assets/icons/image-placeholder.svg'}
                loop
                autoPlay
                muted
                className='size-full aspect-square object-cover'
              >
                <source src={post.files[0].url} type='video/mp4' />
              </video>
                )
              : (
              <img
                src={post.files[0].url ?? '/assets/icons/image-placeholder.svg'}
                alt='Post image'
                loading='lazy'
                height={100}
                width={100}
                className='size-full aspect-square object-cover'
              />
                )}
          </Link>
          <div className='grid-post_user'>
            {showUser && (
              <div className='flex items-center justify-start gap-2 flex-1'>
                <img
                  src={
                    post?.creator?.imageUrl ??
                    '/assets/icons/profile-placeholder.svg'
                  }
                  loading='lazy'
                  alt='Creator post profile'
                  height={32}
                  width={32}
                  className='rounded-full aspect-square object-cover'
                />
                <p className='lime-clamp-1'>{post?.creator?.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user?.$id ?? ''} />}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList
