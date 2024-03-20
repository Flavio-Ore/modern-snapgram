import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { DependencyList, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from './Loader'

type InfinitePostsProps = {
  children: React.ReactNode
  infinityHookResponse: UseInfiniteQueryResult<
    InfiniteData<Models.DocumentList<Models.Document>, unknown>
  >
  isNothingMoreToShow: boolean
  dependencyList?: DependencyList
  triggerNextPage?: boolean
  triggerFetchNextPage?: boolean
  triggerLoader?: boolean
}

/**
 * `InfinitePosts` is a React component that handles infinite scrolling for posts.
 *
 * @component
 * @param children - The elements to be rendered for each post.-
 * @param infinityHookResponse - The response from the `useInfiniteQuery` hook.
 * @param notEmptyData - If `true`, the component will render the children elements when there is data available.
 * @param dependencyList - Array of dependencies to trigger the `fetchNextPage` function only when inView is `true` and the dependencies have changed
 * @param triggerLoader  - If `true`, the component will show a loading spinner, regardless of the state of the data fetching.
 * @param triggerFetchNextPage - If `true`, the component will fetch the next page when it comes into view.
 * @param triggerNextPage - If `true`, the component will show a loading spinner at the end of the page when there are more pages to load.
 *
 * @example
 * <InfinitePosts
 *   infinityHookResponse={useGetInfiniteData()}
 *   notEmptyData={true}
 *   dependencyList={[dependency1, dependency2]}
 *   triggerLoader={isLoading}
 *   triggerFetchNextPage={shouldFetchNextPage}
 *   triggerNextPage={hasMorePages}
 * >
 *   {/* children elements here * /}
 * </InfinitePosts>
 */
const InfinitePosts: React.FC<InfinitePostsProps> = ({
  children,
  infinityHookResponse,
  isNothingMoreToShow = false,
  dependencyList = [],
  triggerLoader = false,
  triggerFetchNextPage = true,
  triggerNextPage = true
}) => {
  const { ref, inView } = useInView()
  const { data, fetchNextPage, isFetching, hasNextPage } = infinityHookResponse

  useEffect(() => {
    if (inView && !isFetching && triggerFetchNextPage) fetchNextPage()
  }, [inView, ...dependencyList])

  if (triggerLoader || !data) {
    return <Loader />
  } else if (data) {
    return (
      <>
        {children}
        {hasNextPage && triggerNextPage && (
          <div ref={ref} className='flex flex-center w-full'>
            <Loader />
          </div>
        )}
      </>
    )
  } else if (isNothingMoreToShow)
    return (
      <p className='text-light-4 mt-10 text-center w-full'>
        There is nothing more to show!
      </p>
    )
}

export default InfinitePosts
