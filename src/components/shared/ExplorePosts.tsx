import { useGetPosts } from '@/lib/queries/queriesAndMutations'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import GridPostList from './GridPostList'
import Loader from './Loader'

interface ExploreDefaultPostsModel {
  isSearching: boolean
  searchValue: string
}
type ExploreDefaultPostsProps = ExploreDefaultPostsModel
const ExploreDefaultPosts: React.FC<ExploreDefaultPostsProps> = ({
  searchValue,
  isSearching
}) => {
  const { ref, inView } = useInView()
  const {
    data: infinitePosts,
    fetchNextPage: fetchNextPostsPage,
    isFetching: isInfinitePostsFetching,
    hasNextPage: hasNextPagePosts
  } = useGetPosts()

  useEffect(() => {
    if (inView && !searchValue && !isInfinitePostsFetching) fetchNextPostsPage()
  }, [inView, searchValue])

  if (isSearching || !infinitePosts) {
    return <Loader />
  } else if (infinitePosts && infinitePosts.pages[0].total > 0) {
    return (
      <>
        {infinitePosts?.pages.map((currentPosts, i) => (
          <GridPostList
            key={`${currentPosts}-posts-${i}`}
            posts={currentPosts.documents}
          />
        ))}
        {hasNextPagePosts && !searchValue && (
          <div ref={ref} className='flex flex-center w-full'>
            <Loader />
          </div>
        )}
      </>
    )
  } else {
    return (
      <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
    )
  }
}
export default ExploreDefaultPosts
