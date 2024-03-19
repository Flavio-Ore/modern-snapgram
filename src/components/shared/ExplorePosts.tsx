import { useGetPosts } from '@/lib/queries/queriesAndMutations'
import GridPostList from './GridPostList'
import InfinitePosts from './InfinitePosts'

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
    <InfinitePosts
      infinityHookResponse={infinitePostsResponse}
      dependencies={[searchValue]}
      conditionIfNoData={isSearching}
      conditionIfinView={!searchValue}
      nextPageCondition={!searchValue}
    >
      {data?.pages.map((currentPosts, i) => (
        <GridPostList
          key={`${currentPosts}-posts-${i}`}
          posts={currentPosts.documents}
        />
      ))}
    </InfinitePosts>
  )
}

export default ExploreDefaultPosts
