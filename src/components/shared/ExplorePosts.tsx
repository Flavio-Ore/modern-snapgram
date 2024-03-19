import { useGetPosts } from '@/lib/queries/queriesAndMutations'
import GridPostList from './GridPostList'
import InfiniteData from './InfiniteScroll'

interface ExploreDefaultPostsModel {
  isSearching: boolean
  searchValue: string
}
type ExploreDefaultPostsProps = ExploreDefaultPostsModel

const ExploreDefaultPosts: React.FC<ExploreDefaultPostsProps> = ({
  searchValue,
  isSearching
}) => {
  const infinitePostsResponse = useGetPosts()
  const { data } = infinitePostsResponse

  return (
    <InfiniteData
      infinityHookResponse={infinitePostsResponse}
      dependencyList={[searchValue]}
      conditionIfNoData={isSearching}
      conditionIfinView={!searchValue}
      conditionToShowLoader={!searchValue}
    >
      {data?.pages.map((currentPosts, i) => (
        <GridPostList
          key={`${currentPosts}-posts-${i}`}
          posts={currentPosts.documents}
        />
      ))}
    </InfiniteData>
  )
}

export default ExploreDefaultPosts
