import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import Loader from '@/components/shared/app/Loader'
import GridPostList from '@/components/shared/posts/GridPostList'
import { useUserContext } from '@/context/useUserContext'
import { useGetInfiniteSavedPosts } from '@/lib/queries/infiniteQueries'
import { type FC, useMemo } from 'react'

const SavedPosts: FC = () => {
  const { user } = useUserContext()
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } = useGetInfiniteSavedPosts({ userId: user.id })

  const posts = useMemo(
    () =>
      data?.pages.flatMap(savesPage =>
        savesPage?.flatMap(saved => saved.post)
      ) ?? [],
    [data]
  )
  if (user == null) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }
  return (
    <InfiniteScroll
      data={data}
      isLoading={isLoading}
      isError={isError}
      isDataEmpty={posts.length === 0}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
    >
      <GridPostList
        posts={posts}
        showStats={false}
        showUser={false}
      />
    </InfiniteScroll>
  )
}

export default SavedPosts
