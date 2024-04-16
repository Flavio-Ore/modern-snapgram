import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useGetUserPosts } from '@/lib/queries/queries'
import { useParams } from 'react-router-dom'

const UserPosts = () => {
  const { id } = useParams()
  const {
    data: relatedPosts,
    isLoading: isRelatedLoading,
    isError: isRelatedError
  } = useGetUserPosts({ userId: id ?? '' })

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
        relatedPosts != null &&
        relatedPosts.length === 0 && (
          <h4 className='h3-bold animate-pulse text-primary-600/80  text-center '>
            No more posts...
          </h4>
      )}
      {!isRelatedLoading && !isRelatedError && relatedPosts != null && (
        <GridPostList posts={relatedPosts} />
      )}
    </>
  )
}

export default UserPosts
