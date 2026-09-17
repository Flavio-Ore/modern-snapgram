import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useGetInfiniteUserPosts } from '@/states/TanStack-query/hooks/infinite-queries/posts/useGetInfiniteUserPosts'
import { useMemo } from 'react'

const UserPosts = ({ userId }: { userId: string }) => {
  const {
    data: userPostsResponse,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage
  } = useGetInfiniteUserPosts({ userId })

  const posts = useMemo(
    () => userPostsResponse?.pages.flatMap(page => page?.data ?? []) ?? [],
    [userPostsResponse]
  )

  return (
    <InfiniteScroll
      data={userPostsResponse}
      isLoading={isLoading}
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isDataEmpty={posts.length === 0}
      isFetching={isFetching}
      skeleton={<GridPostSkeleton />}
    >
      <GridPostList posts={posts} />
    </InfiniteScroll>
  )
}

export default UserPosts
