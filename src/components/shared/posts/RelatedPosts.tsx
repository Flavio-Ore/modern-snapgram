import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useGetInfiniteRelatedPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

const RelatedPosts = ({
  currentPostId,
  creatorId
}: {
  currentPostId: string
  creatorId: string
}) => {
  const {
    data: relatedPostsResponse,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteRelatedPosts({
    postId: currentPostId ?? '',
    userId: creatorId ?? ''
  })
  const relatedPosts = useMemo(
    () => relatedPostsResponse?.pages.flatMap(page => page?.data ?? []) ?? [],
    [relatedPostsResponse]
  )
  return (
    <InfiniteScroll
      data={relatedPostsResponse}
      isLoading={isLoading}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isDataEmpty={relatedPosts.length === 0}
      isFetching={isFetching}
      skeleton={<GridPostSkeleton />}
    >
      <GridPostList posts={relatedPosts} />
    </InfiniteScroll>
  )
}

export default RelatedPosts
