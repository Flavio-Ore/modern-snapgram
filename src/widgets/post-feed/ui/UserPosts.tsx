import { useGetInfiniteUserPosts } from '@entities/post'
import { GridPostSkeleton, InfiniteScroll } from '@shared/ui'
import { useMemo } from 'react'
import GridPostList from './GridPostList'

export interface UserPostsProps {
  userId: string
}

export const UserPosts = ({ userId }: UserPostsProps) => {
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
