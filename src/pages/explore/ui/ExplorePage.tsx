import { useGetInfiniteSearchedPosts } from '@entities/post'
import { useDebounce } from '@shared/lib'
import {
  FilterIcon,
  GridPostSkeleton,
  InfiniteScroll,
  Input,
  Loader,
  SearchIcon
} from '@shared/ui'
import { ExplorePosts, GridPostList } from '@widgets/post-feed'
import { useMemo, useState } from 'react'

const SearchPostsResults = ({ debouncedValue }: { debouncedValue: string }) => {
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useGetInfiniteSearchedPosts({
      searchTerm: debouncedValue
    })

  const posts = useMemo(
    () => data?.pages.flatMap(postsPage => postsPage?.data ?? []) ?? [],
    [data]
  )

  return (
    <InfiniteScroll
      data={data}
      skeleton={<GridPostSkeleton />}
      isDataEmpty={posts.length === 0}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isLoading={isLoading}
      isError={isError}
    >
      <GridPostList posts={posts} />
    </InfiniteScroll>
  )
}

export const ExplorePage = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <div className='flex-start w-full max-w-5xl gap-6'>
          <SearchIcon className='size-9 stroke-primary-500' />
          <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        </div>
        <div className='flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <SearchIcon className='size-6' />
          <Input
            type='search'
            placeholder='Search for posts...'
            className='explore-search'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular today</h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <FilterIcon />
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {isTyping && debouncedValue === '' && <Loader />}
        {isTyping && <SearchPostsResults debouncedValue={debouncedValue} />}
        {!isTyping && <ExplorePosts />}
      </div>
    </div>
  )
}

export default ExplorePage
