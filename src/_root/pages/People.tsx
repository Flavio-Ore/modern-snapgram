import Loader from '@/components/shared/Loader'
import UserCard from '@/components/shared/UserCard'
import { useGetUsers } from '@/lib/queries/queries'
import { E_USERS } from '@/values'

const People = () => {
  const { data: users, isLoading, isError } = useGetUsers({ limit: 12 })
  console.log('users :>> ', users)
  return (
    <div className='common-container'>
      <div className='user-container'>
        <div className='flex-start w-full max-w-5xl gap-6'>
          <img
            src='/assets/icons/people.svg'
            height={36}
            width={36}
            className='invert-white'
            alt='people'
          />
          <h2 className='md:h1-bold h3-bold'>All Users</h2>
        </div>
        <ul className='user-grid'>
          {isError && <p>Something went wrong</p>}
          {isLoading && <Loader />}
          {!isError &&
            !isLoading &&
            users?.documents.map((user, i) => {
              return (
                <li key={i}>
                  <UserCard
                    imgUrl={
                      user.imageUrl || '/assets/icons/profile-placeholder.svg'
                    }
                    name={user.name}
                    mainFollower={`@${user.username}`}
                    profileLink={`/profile/${user.$id}`}
                    role={E_USERS.ALL_USERS}
                  />
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default People
