import { useGetInfiniteSavedPosts } from '@entities/post'
import { useSessionUser } from '@entities/user'
import { GridPostSkeleton, InfiniteScroll } from '@shared/ui'
import { useMemo } from 'react'
import GridPostList from './GridPostList'

export const SavedPosts = () => {
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
