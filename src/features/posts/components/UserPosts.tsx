import InfiniteScroll from '@/components/InfiniteScroll'
import GridPostList from '@posts/components/GridPostList'
import GridPostSkeleton from '@posts/components/GridPostSkeleton'
import { useGetInfiniteUserPosts } from '@posts/hooks/useGetInfiniteUserPosts'
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
