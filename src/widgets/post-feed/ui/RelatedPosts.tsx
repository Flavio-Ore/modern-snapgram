import InfiniteScroll from '@/components/InfiniteScroll'
import { useGetInfiniteRelatedPosts } from '@entities/post'
import GridPostSkeleton from '@posts/components/GridPostSkeleton'
import { useMemo } from 'react'
import GridPostList from './GridPostList'

export interface RelatedPostsProps {
  currentPostId: string
  creatorId: string
}

export const RelatedPosts = ({
  currentPostId,
  creatorId
}: RelatedPostsProps) => {
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
