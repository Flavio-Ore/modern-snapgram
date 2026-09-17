import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import GridPostSkeleton from '@/components/shared/skeletons/GridPostSkeleton'
import { useAccount } from '@/context/useAccountContext'
import { useGetInfiniteSavedPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

const SavedPosts = () => {
  const { id, isLoading: isUserLoading } = useAccount()
  const {
    data,
    isError,
    isLoading: isSavesLoading,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useGetInfiniteSavedPosts({ userId: id })

  const posts = useMemo(
    () =>
      data?.pages.flatMap(savesPage =>
        savesPage?.data?.flatMap(saves => saves.post) ?? []
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
