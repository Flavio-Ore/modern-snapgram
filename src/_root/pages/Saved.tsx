import GridPostList from '@/components/shared/GridPostList'
import InfinitePosts from '@/components/shared/InfinitePosts'
import Loader from '@/components/shared/Loader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useUserContext } from '@/context/useUserContext'
import { useGetInfiniteSavedPosts } from '@/lib/queries/infiniteQueries'
import { useMemo } from 'react'

export const SavedPosts = () => <h1 className='h1-bold w-full'>Saved</h1>
export const SavedReels = () => {
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
    <InfinitePosts
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
    </InfinitePosts>
  )
}
export const SavedCollections = () => (
  <h1 className='h1-bold'>Saved Collections</h1>
)
const savedCollections = [
  {
    filter: 'Posts',
    icon: '/assets/icons/posts.svg'
  },
  {
    filter: 'Reels',
    icon: '/assets/icons/reels.svg'
  },
  {
    filter: 'Collections',
    icon: '/assets/icons/collections.svg'
  }
]

const getComponent = (filter: string) => {
  switch (filter) {
    case 'Posts':
      return () => <div></div>
    case 'Reels':
      return SavedReels
    case 'Collections':
      return SavedCollections
    default:
      return () => <div>Not found</div>
  }
}

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
        <Tabs
          defaultValue={savedCollections[0].filter}
          className='flex flex-col xxs:gap-8 gap-16 w-full'
        >
          <TabsList className='grid grid-flow-row xxs:flex-center w-full max-w-lg gap-1 xs:gap-0'>
            {savedCollections.map(({ filter, icon }, index) => (
              <TabsTrigger
                key={filter + icon}
                value={filter}
                className={`data-[state=active]:bg-dark-4 flex-center w-full small-medium lg:body-medium px-6 py-2 border gap-2 ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${
                  index === savedCollections.length - 1
                    ? 'rounded-r-lg col-span-2'
                    : ''
                } border-dark-4 group transition hover:bg-dark-4
                    `}
              >
                <img src={icon} alt='Link selection' width={20} height={20} />
                <p className='text-ellipsis'>{filter}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {savedCollections.map(({ filter }, index) => {
            const Component = getComponent(filter)
            return (
              <TabsContent key={index} value={filter}>
                <Component />
              </TabsContent>
            )
          })}
        </Tabs>

        {/* <div className='flex-between xxs:flex-row flex-col gap-2  xxs:gap-0 flex-1 w-full max-w-lg mt-2 mb-2'>
            {savedCollections.map(({ path, filter, icon }, index) => (
              <Link
                key={index}
                to={path}
                className={`flex-start xxs:flex-center w-full gap-2 small-medium lg:body-medium px-3 py-2 border ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${
                  index === savedCollections.length - 1 ? 'rounded-r-lg' : ''
                } border-dark-4 group transition hover:bg-dark-4 ${
                  pathname === path ? 'bg-dark-4' : 'bg-dark-2'
                }
                `}
              >
                <img src={icon} alt='Link selection' />
                <p>{filter}</p>
              </Link>
            ))}
          </div> */}
      </div>
      {/* <Outlet /> */}
    </div>
  )
}

export default Saved
