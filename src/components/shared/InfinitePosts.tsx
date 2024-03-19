import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from './Loader'

type InfinitePostsProps = {
  infinityHookResponse: UseInfiniteQueryResult<
    InfiniteData<Models.DocumentList<Models.Document>, unknown>
  >
  dependencies?: unknown[]
  conditionIfNoData?: boolean
  conditionIfinView?: boolean
  nextPageCondition?: boolean
  children: React.ReactNode
}

const InfinitePosts: React.FC<InfinitePostsProps> = ({
  children,
  infinityHookResponse,
  dependencies = [],
  conditionIfNoData = false,
  conditionIfinView = true,
  nextPageCondition = true
}) => {
  const { ref, inView } = useInView()
  const { data, fetchNextPage, isFetching, hasNextPage } = infinityHookResponse

  useEffect(() => {
    if (inView && !isFetching && conditionIfinView) fetchNextPage()
  }, [inView, ...dependencies])

  if (conditionIfNoData || !data) {
    return <Loader />
  } else if (data && data.pages[0].total > 0) {
    return (
      <>
        {children}
        {hasNextPage && nextPageCondition && (
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

export default InfinitePosts
