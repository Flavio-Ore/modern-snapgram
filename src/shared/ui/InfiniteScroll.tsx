import { LoaderIcon } from './icons'
import { cn } from '../lib/cn'
import {
  type FetchNextPageOptions,
  type InfiniteData,
  type InfiniteQueryObserverResult
} from '@tanstack/react-query'
import { type ReactNode, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export interface InfiniteScrollProps {
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

export const InfiniteScroll = ({
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
