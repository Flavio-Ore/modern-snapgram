import Loader from '@/components/shared/app/Loader'
import {
  type FetchNextPageOptions,
  type InfiniteData,
  type InfiniteQueryObserverResult
} from '@tanstack/react-query'
import { type FC, type ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
interface InfiniteScrollProps {
  children: ReactNode
  skeleton?: ReactNode
  isDataEmpty: boolean
  data: InfiniteData<unknown> | undefined
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>>
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
 * @param skeleton - The skeleton element to be rendered while loading first time.
 * @param data - The data to be displayed.
 * @param isDataEmpty - A boolean value that indicates if the data is empty.
 * @param hasNextPage - A boolean value that indicates if there is a next page of data.
 * @param fetchNextPage - A function that fetches the next page of data.
 * @param isFetching - A boolean value that indicates if the data is being fetched.
 * @param isLoading - A boolean value that indicates if the data is loading.
 * @param isError - A boolean value that indicates if an error occurred while fetching the data.
 * @returns {React.FC<InfiniteScrollProps>}
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
const InfiniteScroll: FC<InfiniteScrollProps> = ({
  children,
  skeleton,
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
    if (inView && !isFetching && hasNextPage) void fetchNextPage()
  }, [inView])
  return (
    <>
      {isLoading && (
        <div className='flex-center size-full'>
          {skeleton}
        </div>
      )}
      {isError && (
        <p className='text-light-4 mt-10 text-center w-full'>
          An error occurred while fetching the data 👮‍♂️👮‍♀️
        </p>
      )}
      {!isLoading && !isError && data != null && isDataEmpty && (
        <p className='text-light-4 mt-10 text-center w-full'>
          No posts found 🗑
        </p>
      )}
      {!isLoading && !isError && data != null && (
        <>
          {children}
          {hasNextPage && (
            <div ref={ref} className='flex mt-10 flex-center w-full'>
              <Loader />
            </div>
          )}
          {!isLoading && !isError && !hasNextPage && (
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
