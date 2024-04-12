import PostStats from '@/components/shared/posts/PostStats'
import { useUserContext } from '@/context/useUserContext'
import { type Post } from '@/types'
import { type FC } from 'react'
import { Link } from 'react-router-dom'

interface GridPostListModel {
  posts: Post[]
  showUser?: boolean
  showStats?: boolean
}
type GridPostListProps = GridPostListModel
const GridPostList: FC<GridPostListProps> = ({
  posts,
  showUser = true,
  showStats = true
}) => {
  const { user } = useUserContext()
  const key = posts.map(posts => posts.$id).toString()
  console.log('key :>> ', key)
  console.log('posts :>> ', posts)
  return (
    <ul className='grid-container'>
      {posts.map((post, i) => (
        <li key={`${key}-${i}`} className='relative'>
          <Link to={`/posts/${post?.$id}`} className='grid-post_link'>
            <img
              src={post.imageUrl ?? '/assets/icons/loader.svg'}
              alt='Post image'
              loading='lazy'
              height={100}
              width={100}
              className='size-full object-cover aspect-auto'
            />
          </Link>
          <div className='grid-post_user'>
            {showUser && (
              <div className='flex items-center justify-start gap-2 flex-1'>
                <img
                  src={
                    post?.creator?.imageUrl ?? '/assets/icons/profile-placeholder.svg'
                  }
                  loading='lazy'
                  alt='Creator post profile'
                  height={32}
                  width={32}
                  className='rounded-full'
                />
                <p className='lime-clamp-1'>{post?.creator?.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GridPostList
