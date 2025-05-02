import InfiniteScroll from '@/components/InfiniteScroll'
import { useSessionUser } from '@auth/hooks/useSessionUser'
import GridPostList from '@posts/components/GridPostList'
import GridPostSkeleton from '@posts/components/GridPostSkeleton'
import { useGetInfiniteSavedPosts } from '@saved/hooks/useGetInfiniteSavedPosts'
import { useMemo } from 'react'

const SavedPosts = () => {
  const { data: user, isLoading: isUserLoading } = useSessionUser()
  const {
    data,
    isError,
    isLoading: isSavesLoading,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useGetInfiniteSavedPosts({ userId: user?.$id ?? '' })

  const posts = useMemo(
    () =>
      data?.pages.flatMap(
        page => page?.data.flatMap(record => record.post) ?? []
      ) ?? [],
    [data]
  )
  return (
    <InfiniteScroll
      data={data}
      skeleton={<GridPostSkeleton />}
      isLoading={isUserLoading || isSavesLoading}
      isError={isError}
      isDataEmpty={posts.length === 0}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
    >
      <GridPostList posts={posts} showStats={false} showUser={false} />
    </InfiniteScroll>
  )
}

export default SavedPosts
