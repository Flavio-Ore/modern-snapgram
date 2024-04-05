import CustomTabs from '@/components/shared/app/CustomTabs'
import Loader from '@/components/shared/app/Loader'
import { Button } from '@/components/ui/button'
import { useGetCurrentUser, useGetUserById } from '@/lib/queries/queries'
import { User } from '@/types'
import { PROFILES_TRIGGERS } from '@/values'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

interface ProfileButtonProps {
  idMatch: boolean
}
const ProfileButtons: React.FC<ProfileButtonProps> = ({ idMatch }) =>
  idMatch ? (
    <Link
      to='/update-profile'
      className='flex-center gap-2 small-medium py-2.5  px-5 bg-dark-3 hover:bg-light-4 rounded-lg transition'
    >
      <img
        src='/assets/icons/edit-profile.svg'
        alt='edit'
        height={18}
        width={18}
        className='invert-primary stroke-secondary-500'
      />
      Edit Profile
    </Link>
  ) : (
    <div className='flex-center gap-1'>
      <Button className='shad-button_primary px-5 py-2.5 hover:bg-primary-600'>
        <p className='small-medium'>Follow</p>
      </Button>
      <Button className='shad-button_ghost bg-light-1 text-dark-1 hover:bg-light-4'>
        <p className='small-semibold'>Message</p>
      </Button>
    </div>
  )
interface ProfileStatsProps {
  stats: { name: string; value: number }[]
}
const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => (
  <div className='grid grid-flow-row xxs:flex place-items-center w-full max-w-lg gap-1 xxs:gap-0'>
    {stats.map(({ name, value }) => (
      <Button
        key={name}
        className='shad-button_ghost small-medium md:body-medium'
      >
        <span className='text-primary-500'>{value}</span> {name}
      </Button>
    ))}
  </div>
)

const ProfileInnerContainer = () => {
  const { id } = useParams()
  const {
    data: sessionUser,
    isLoading: isSessionLoading,
    isError: isSessionError,
    isFetched: isSessionFetched
  } = useGetCurrentUser()
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    isFetched: isUserFetched
  } = useGetUserById({ userId: id || '' })

  const isLoading = isSessionLoading && isUserLoading
  const isError = isSessionError && isUserError
  const realUser: User | undefined = useMemo(
    () => (id === sessionUser?.$id ? sessionUser : user || {}),
    [sessionUser, user, id]
  )
  const profileStats = useMemo(
    () => ({
      posts: realUser?.posts?.length || 0,
      liked: realUser?.liked?.length || 0,
      following: realUser?.followers?.length || 0
    }),
    [realUser]
  )
  const stats = Object.keys(profileStats).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: profileStats[key]
  }))
  return (
    <div className='profile-inner_container'>
      {isLoading && (
        <div className='flex-center h-[150px] w-[150px] aspect-square'>
          <Loader />
        </div>
      )}
      {isError && <p>Something went wrong 👮‍♀️👮‍♂️</p>}
      {!isLoading && !isError && realUser && (
        <img
          src={realUser.imageUrl || '/assets/icons/default-avatar.svg'}
          alt={realUser.name || 'Profile Avatar'}
          height={150}
          width={150}
          className='rounded-full'
        />
      )}
      <div className='flex-between flex-col h-full gap-2 xl:gap-0'>
        {isLoading && <Loader />}
        {isError && <h2>An unexpected error happened.</h2>}
        {!isLoading && !isError && realUser && (
          <div className='flex-between flex-col md:flex-row w-full gap-2 xl:gap-0'>
            <h2 className='body-medium xs:h3-bold lg:h1-semibold max-w-48 lg:max-w-72 xl:max-w-2xl text-overflow-ellipsis'>
              {realUser.name}
            </h2>
            {isSessionFetched && isUserFetched && sessionUser ? (
              <ProfileButtons idMatch={id === sessionUser.$id} />
            ) : (
              <Loader />
            )}
          </div>
        )}
        <h3 className='md:self-start self-center small-medium xs:base-medium text-light-3 '>
          @
          {isLoading
            ? 'Loading username...'
            : isError
            ? 'Error loading username'
            : realUser?.username || 'Error loading username'}
        </h3>

        <ProfileStats stats={stats} />
      </div>
    </div>
  )
}

const Profile = () => {
  return (
    <div className='profile-container'>
      <ProfileInnerContainer />
      <div className='flex flex-1 w-full'>
        <CustomTabs tabsOperations={PROFILES_TRIGGERS} />
      </div>
    </div>
  )
}

export default Profile
