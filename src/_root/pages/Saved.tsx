import CustomTabs from '@/components/shared/app/CustomTabs'
import InfiniteScroll from '@/components/shared/app/InfiniteScroll'
import Loader from '@/components/shared/app/Loader'
import GridPostList from '@/components/shared/posts/GridPostList'
import { useUserContext } from '@/context/useUserContext'
import { useGetInfiniteSavedPosts } from '@/lib/queries/infiniteQueries'
import { SAVES_TRIGGERS } from '@/values'
import { useMemo } from 'react'

export const SavedPosts = () => {
  const { user } = useUserContext()
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetInfiniteSavedPosts({ userId: user.id })
  const posts = useMemo(
    () =>
      data?.pages.flatMap(savesPage =>
        savesPage.flatMap(saved => saved.post)
      ) ?? [],
    [data]
  )
  if (!user)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
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
        key={`${posts}-SAVED_REELS-%&`}
        posts={posts}
        showStats={false}
        showUser={false}
      />
    </InfiniteScroll>
  )
}
export const SavedReels = () => <h1 className='h1-bold w-full'>Saved Reels</h1>
export const SavedCollections = () => (
  <h1 className='h1-bold'>Saved Collections</h1>
)

const Saved = () => {
  return (
    <div className='saved-container w-full'>
      <div className='flex flex-start w-full gap-3'>
        <img
          src='/assets/icons/bookmark.svg'
          height={36}
          width={36}
          className='invert-white'
          alt='people'
        />
        <h2 className='h3-bold md:h1-bold'>Saved Posts</h2>
      </div>
      <div className='flex flex-1 w-full'>
        <CustomTabs tabsOperations={SAVES_TRIGGERS} />
      </div>
    </div>
  )
}

export default Saved
