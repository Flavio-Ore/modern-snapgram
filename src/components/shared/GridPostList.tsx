import { useUserContext } from '@/context/useUserContext'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

interface GridPostListModel {
  posts: Models.Document[]
  showUser?: boolean
  showStats?: boolean
}
type GridPostListProps = GridPostListModel
const GridPostList: React.FC<GridPostListProps> = ({
  posts,
  showUser = true,
  showStats = true
}) => {
  const { user } = useUserContext()
  console.log('posts :>> ', posts)
  if (!posts) return null
  return (
    <ul className='grid-container'>
      {posts.map((post, i) => (
        <li
          key={`${posts?.[i]?.$updatedAt || i}-${posts?.[i]?.$id || i + 1}`}
          className='relative'
        >
          <Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img
              src={post.imageUrl}
              alt='Post image'
              loading='lazy'
              height={100}
              width={100}
              className='w-full h-full object-cover aspect-auto'
            />
          </Link>
          <div className='grid-post_user'>
            {showUser && (
              <div className='flex items-center justify-start gap-2 flex-1'>
                <img
                  src={
                    post.creator.imageUrl ||
                    '/assets/icons/profile-placeholder.svg'
                  }
                  loading='lazy'
                  alt='Creator post profile'
                  height={32}
                  width={32}
                  className='rounded-full'
                />
                <p className='lime-clamp-1'>{post.creator.name}</p>
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
