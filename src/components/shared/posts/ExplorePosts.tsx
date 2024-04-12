import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetInfinitePosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

const ExplorePostsSkeleton = () => <div>
  <Skeleton className='h-16 w-full' />
</div>

const ExplorePosts = () => {
  const { data, isFetching, isError, isLoading, hasNextPage, fetchNextPage } =
    useGetInfinitePosts()
  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage) ?? [],
    [data]
  )
  return (
    <InfiniteScroll
      data={data}
      skeleton={<ExplorePostsSkeleton />}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isDataEmpty={posts.length === 0}
    >
      <GridPostList posts={posts} />
    </InfiniteScroll>
  )
}

export default ExplorePosts
