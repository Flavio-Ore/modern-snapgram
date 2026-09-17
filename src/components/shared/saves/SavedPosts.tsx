import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import { useUserContext } from '@/context/useUserContext'
import { useGetInfiniteSavedPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'
import GridPostSkeleton from '../skeletons/GridPostSkeleton'

const SavedPosts = () => {
  const { user, isLoading: isUserLoading } = useUserContext()
  const {
    data,
    isError,
    isLoading: isSavesLoading,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useGetInfiniteSavedPosts({ userId: user.id })

  const posts = useMemo(
    () =>
      data?.pages.flatMap(savesPage =>
        savesPage?.flatMap(saves => saves.post)
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
