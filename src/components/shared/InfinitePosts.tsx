import { useDebounce } from '@/hooks/useDebounce'
import { useGetPosts, useSearchPosts } from '@/lib/queries/queriesAndMutations'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import GridPostList from './GridPostList'
import Loader from './Loader'
import SearchResults from './SearchResults'

interface InfinitePostsModel {
  searchValue: string
}
type InfinitePostsProps = Partial<InfinitePostsModel>
const InfinitePosts: React.FC<InfinitePostsProps> = ({ searchValue }) => {
  const { ref, inView } = useInView()
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const {
    data: infinitePosts,
    fetchNextPage,
    isFetching: isInfiniteFetching,
    hasNextPage
  } = useGetPosts()
  const debouncedValue = useDebounce(searchValue, 500)
  const { data: searchedPosts, isFetching: isSearchedFetching } =
    useSearchPosts({
      searchTerm: debouncedValue
    })

  useEffect(() => {
    if (inView && !searchValue && !isInfiniteFetching) fetchNextPage()
  }, [inView, searchValue])

  useEffect(() => {
    if (!isSearchedFetching) setIsSearchLoading(false)
  }, [isSearchedFetching])

  if (!infinitePosts)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )

  const shouldShowSearchResults = searchValue !== ''
  const shouldShowPosts =
    !shouldShowSearchResults &&
    infinitePosts.pages.every(item => item.documents.length === 0)

  return (
    <>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular today</h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img
            src='/assets/icons/filter.svg'
            width={20}
            height={20}
            alt='Filter Icon'
          />
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearching={isSearchLoading}
            searchedPosts={searchedPosts?.documents}
          />
        ) : shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>End of posts</p>
        ) : (
          infinitePosts.pages.map((currentPosts, index) => (
            <GridPostList
              key={`${currentPosts}-${index}`}
              posts={currentPosts.documents}
            />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default InfinitePosts
