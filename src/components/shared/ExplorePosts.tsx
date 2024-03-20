import { useGetPosts } from '@/lib/queries/queriesAndMutations'
import { OPERATIONS } from '@/values'
import GridPostList from './GridPostList'
import InfinitePosts from './InfiniteScroll'

interface ExploreDefaultPostsModel {
  isSearching: boolean
  searchValue: string
  isNothingMoreToShow: boolean
}
type ExploreDefaultPostsProps = ExploreDefaultPostsModel

const ExploreDefaultPosts: React.FC<ExploreDefaultPostsProps> = ({
  searchValue,
  isSearching,
  isNothingMoreToShow
}) => {
  const infinitePostsResponse = useGetPosts()
  const { data } = infinitePostsResponse

  return (
    <InfinitePosts
      infinityHookResponse={infinitePostsResponse}
      isNothingMoreToShow={isNothingMoreToShow}
      dependencyList={[searchValue]}
      triggerLoader={isSearching}
      triggerFetchNextPage={!searchValue}
      triggerNextPage={!searchValue}
    >
      {data?.pages.map((currentPosts, i) => (
        <GridPostList
          key={`${currentPosts}-${OPERATIONS.EXPLORE_POSTS}-${i}`}
          posts={currentPosts.documents}
        />
      ))}
    </InfinitePosts>
  )
}

export default ExploreDefaultPosts
