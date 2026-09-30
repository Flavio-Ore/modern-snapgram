import { type Post } from '@/types'
import { useSessionUser } from '@entities/user'
import { PostCard as EntityPostCard } from '@entities/post'
import PostStats from '@posts/components/PostStats'

interface PostCardProps {
  post: Post | undefined | null
}

const PostCard = ({ post }: PostCardProps) => {
  const { data: user } = useSessionUser()
  const userId = user?.$id ?? ''

  if (!post) {
    return <EntityPostCard post={null} />
  }

  return (
    <EntityPostCard
      post={post}
      currentUserId={userId}
      statsSlot={<PostStats post={post} userId={userId} />}
    />
  )
}

export default PostCard
