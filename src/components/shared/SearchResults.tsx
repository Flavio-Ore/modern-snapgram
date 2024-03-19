import { useInfiniteSearchPosts } from '@/lib/queries/queriesAndMutations'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import GridPostList from './GridPostList'
import Loader from './Loader'

interface SearchResultsModel {
  isSearching: boolean
  searchValue: string
}
type SearchResultsProps = SearchResultsModel

const SearchResults: React.FC<SearchResultsProps> = ({
  isSearching,
  searchValue
}) => {
  const { ref, inView } = useInView()
  const {
    data: infiniteSearchedPosts,
    fetchNextPage: fetchNextSearchedPage,
    hasNextPage: hasSearchedNextPage
  } = useInfiniteSearchPosts({
    searchTerm: searchValue
  })

  useEffect(() => {
    if (inView && searchValue && !isSearching) fetchNextSearchedPage()
  }, [inView, searchValue])

  if (isSearching || !infiniteSearchedPosts) {
    return <Loader />
  } else if (
    infiniteSearchedPosts &&
    infiniteSearchedPosts.pages[0].total > 0
  ) {
    return (
      <>
        {infiniteSearchedPosts?.pages.map((currentPosts, i) => (
          <GridPostList
            key={`${currentPosts}-searched-posts-${i}`}
            posts={currentPosts.documents}
          />
        ))}
        {hasSearchedNextPage && (
          <div ref={ref} className='flex flex-center w-full'>
            <Loader />
          </div>
        )}
      </>
    )
  }
  return (
    <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
  )
}
export default SearchResults
