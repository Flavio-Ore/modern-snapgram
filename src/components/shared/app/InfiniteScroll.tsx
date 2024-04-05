import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from './Loader'

interface InfinitePostsProps {
  children: React.ReactNode
  isDataEmpty: boolean
  data: InfiniteData<unknown> | undefined
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >
  isFetching: boolean
  isLoading: boolean
  isError: boolean
  hasNextPage: boolean
}

/**
 * `InfinitePosts` is a React component that handles infinite scrolling for posts.
 *
 * @component
 * @param children - The children elements to be rendered.
 * @param data - The data to be displayed.
 * @param isDataEmpty - A boolean value that indicates if the data is empty.
 * @param hasNextPage - A boolean value that indicates if there is a next page of data.
 * @param fetchNextPage - A function that fetches the next page of data.
 * @param isFetching - A boolean value that indicates if the data is being fetched.
 * @param isLoading - A boolean value that indicates if the data is loading.
 * @param isError - A boolean value that indicates if an error occurred while fetching the data.
 * @returns {React.FC<InfinitePostsProps>}
 *
 * @example
 * <InfinitePosts
 *   isDataEmpty={isDataEmpty}
 *   data={data}
 *   hasNextPage={hasNextPage}
 *   fetchNextPage={fetchNextPage}
 *   isFetching={isFetching}
 *   isLoading={isLoading}
 *   isError={isError}
 *  >
 *    {children}
 * </InfinitePosts>
 */
const InfiniteScroll: React.FC<InfinitePostsProps> = ({
  children,
  isDataEmpty,
  data,
  fetchNextPage,
  isFetching,
  isLoading,
  isError,
  hasNextPage
}) => {
  const { ref, inView } = useInView({
    threshold: 0
  })
  useEffect(() => {
    if (inView && !isFetching && hasNextPage === true) fetchNextPage()
  }, [inView])
  return (
    <>
      {isLoading && (
        <div className='flex-center w-full h-full'>
          <Loader />
        </div>
      )}
      {isError && (
        <p className='text-light-4 mt-10 text-center w-full'>
          An error occurred while fetching the data 👮‍♂️👮‍♀️
        </p>
      )}
      {!isLoading && !isError && isDataEmpty && (
        <p className='text-light-4 mt-10 text-center w-full'>
          No posts found 🗑
        </p>
      )}
      {!isLoading && !isError && data && (
        <>
          {children}
          {hasNextPage === true && (
            <div ref={ref} className='flex mt-10 flex-center w-full'>
              <Loader />
            </div>
          )}
          {!isLoading && !isError && hasNextPage === false && (
            <p className='text-light-4 mt-10 text-center w-full'>
              There is nothing more to show! 💤
            </p>
          )}
        </>
      )}
    </>
  )
}

export default InfiniteScroll
