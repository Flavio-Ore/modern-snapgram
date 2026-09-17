import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import GridPostList from '@/components/shared/posts/GridPostList'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserContext } from '@/context/useUserContext'
import { useGetInfiniteSavedPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

const SavedPostsSkeleton = () => (
  <div className='grid-container'>
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
    <Skeleton className='relative grid-post_link min-h-72 min-w-min-h-72' />
  </div>
)

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
      skeleton={<SavedPostsSkeleton />}
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
