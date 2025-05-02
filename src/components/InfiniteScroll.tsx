import LoaderIcon from '@/components/icons/LoaderIcon'
import { cn } from '@/utils/cn'
import {
  type FetchNextPageOptions,
  type InfiniteData,
  type InfiniteQueryObserverResult
} from '@tanstack/react-query'
import { type ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
interface InfiniteScrollProps {
  children: ReactNode
  skeleton?: ReactNode
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
 * A component that enables infinite scrolling behavior.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the InfiniteScroll component.
 * @param {ReactNode} props.skeleton - The skeleton element to be displayed while loading.
 * @param {boolean} props.isDataEmpty - Indicates whether the data is empty.
 * @param {any} props.data - The data to be rendered.
 * @param {Function} props.fetchNextPage - The function to fetch the next page of data.
 * @param {boolean} props.isFetching - Indicates whether data is currently being fetched.
 * @param {boolean} props.isLoading - Indicates whether the component is in a loading state.
 * @param {boolean} props.isError - Indicates whether an error occurred.
 * @param {boolean} props.hasNextPage - Indicates whether there is a next page of data.
 * @returns {JSX.Element} The rendered InfiniteScroll component.
 */
const InfiniteScroll = ({
  children,
  skeleton,
  isDataEmpty,
  data,
  fetchNextPage,
  isFetching,
  isLoading,
  isError,
  hasNextPage
}: InfiniteScrollProps) => {
  const { ref, inView } = useInView({
    threshold: 0
  })
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) void fetchNextPage()
  }, [inView])
  return (
    <>
      {isLoading && <div className='flex-center size-full'>{skeleton}</div>}
      {isError && (
        <p className='text-light-4 mt-10 text-center h3-bold w-full animate-pulse'>
          An error occurred...
          <small className='block text-secondary-500'></small>
        </p>
      )}
      {!isLoading && !isError && data != null && isDataEmpty && (
        <p className='text-light-4 mt-10 text-center body-bold w-full animate-pulse'>
          No more found!
        </p>
      )}
      {!isLoading && !isError && data != null && !isDataEmpty && (
        <>
          {children}
          {hasNextPage && (
            <div
              ref={ref}
              className={cn('flex mt-10 flex-center w-full', {
                'animate-fade-out-down animate-duration-1000 animate-delay-1000':
                  inView
              })}
            >
              <LoaderIcon className='stroke-secondary-500' />
            </div>
          )}
          {!isLoading && !isError && !hasNextPage && (
            <p className='text-light-4 mt-10 text-center w-full animate-pulse'>
              There is nothing more to show!
            </p>
          )}
        </>
      )}
    </>
  )
}

export default InfiniteScroll
