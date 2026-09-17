import Loader from '@/components/shared//app/Loader'
import UserCard from '@/components/shared/users/UserCard'
import { useGetUsers } from '@/lib/queries/queries'
import { E_USERS } from '@/values'

const TopCreators = () => {
  const { data: topCreators, isLoading, isError } = useGetUsers({ limit: 8 })
  return (
    <ul className='home-creators_grid'>
      {isLoading && <Loader />}
      {isError && <p>Error 🚔</p>}
      {!isLoading &&
        !isError &&
        topCreators &&
        topCreators?.map(user => (
          <li key={user.$id}>
            <UserCard
              imgUrl={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              name={user.name || 'Not found'}
              mainFollower={`Followed by ${user.followers || 'Not found'}`}
              profileLink={`/profile/${user.$id}`}
              role={E_USERS.TOP_CREATORS}
            />
          </li>
        ))}
    </ul>
  )
}

const RightSidebar = () => {
  return (
    <div className='home-creators'>
      <h2 className='h3-bold'>Top Creators</h2>
      <TopCreators />
    </div>
  )
}

export default RightSidebar
