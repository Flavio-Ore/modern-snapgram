import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useGetUserPosts } from '@/lib/queries/queries'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const UserPosts = () => {
  const { id } = useParams()
  const {
    data: userPostsResponse,
    isLoading: isRelatedLoading,
    isError: isRelatedError
  } = useGetUserPosts({ userId: id ?? '' })

  const userPosts = useMemo(
    () => userPostsResponse?.data ?? [],
    [userPostsResponse]
  )

  return (
    <>
      {isRelatedLoading && <GridPostSkeleton />}
      {isRelatedError && (
        <h4 className='h3-bold animate-pulse text-secondary-500  text-center'>
          Oops... Error loading posts!
        </h4>
      )}
      {!isRelatedLoading &&
        !isRelatedError &&
        userPostsResponse != null &&
        userPosts.length === 0 && (
          <h4 className='h3-bold animate-pulse text-primary-600/80  text-center '>
            No more posts...
          </h4>
      )}
      {!isRelatedLoading && !isRelatedError && userPostsResponse != null && (
        <GridPostList posts={userPosts} />
      )}
    </>
  )
}

export default UserPosts
