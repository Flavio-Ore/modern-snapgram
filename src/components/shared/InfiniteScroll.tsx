import { InfiniteData } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from './Loader'

type InfinitePostsProps = {
  children: React.ReactNode
  isDataEmpty: boolean
  data: InfiniteData<unknown> | undefined
  fetchNextPage: () => void
  isFetching: boolean
  isLoading: boolean
  isError: boolean
  hasNextPage: boolean
}

/**
 * `InfinitePosts` is a React component that handles infinite scrolling for posts.
 *
 * @component
 * @param children - The elements to be rendered for each post.-
 * @param infinityHookResponse - The response from the `useInfiniteQuery` hook.
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

  console.log('infinityHookResponse :>> ', {
    children,
    data,
    isDataEmpty,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError
  })

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) fetchNextPage()
  }, [inView])

  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <p className='text-light-4 mt-10 text-center w-full'>
          An error occurred while fetching the data 👮‍♂️👮‍♀️
        </p>
      )}
      {/* If there is no data and the loading spinner is not showing, show a message */}
      {!isLoading && !isError && isDataEmpty && (
        <p className='text-light-4 mt-10 text-center w-full'>
          No posts found 🗑
        </p>
      )}
      {/* If there is data, show the children elements and the loading spinner at the end of the page if there are more pages to load */}
      {!isLoading && !isError && data && (
        <>
          {children}
          {hasNextPage === true && (
            <div ref={ref} className='flex flex-center w-full'>
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

      {/* If there is no more data to show, show a message */}
    </>
  )
}

export default InfinitePosts
