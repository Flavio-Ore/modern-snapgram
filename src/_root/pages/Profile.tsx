import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetCurrentUser, useGetUserById } from '@/lib/queries/queries'
import { Tabs } from '@radix-ui/react-tabs'
import { Link, useParams } from 'react-router-dom'
import { SavedCollections, SavedReels } from './Saved'

const savedCollections = [
  {
    filter: 'Posts',
    icon: '/assets/icons/posts.svg'
  },
  {
    filter: 'Reels',
    icon: '/assets/icons/reels.svg'
  },
  {
    filter: 'Tagged',
    icon: '/assets/icons/tagged.svg'
  }
]

const getComponent = (filter: string) => {
  switch (filter) {
    case 'Posts':
      return () => <div></div>
    case 'Reels':
      return SavedReels
    case 'Tagged':
      return SavedCollections
    default:
      return () => <div>Not found</div>
  }
}

const Profile = () => {
  const { data: sessionUser } = useGetCurrentUser()
  const { id } = useParams()
  const {
    data: user,
    isLoading,
    isError
  } = useGetUserById({ userId: id || '' })

  if (isLoading) return <Loader />
  if (isError) return <p>Something went wrong</p>
  if (!user) return <Loader />
  if (!sessionUser) return <Loader />

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <img
          src={id === sessionUser.$id ? sessionUser.imageUrl : user.imageUrl}
          alt={id === sessionUser.$id ? sessionUser.name : user.name}
          height={150}
          width={150}
          className='rounded-full'
        />
        <div className='flex-between flex-col h-full gap-2 xl:gap-0'>
          <div className='flex-between flex-col md:flex-row w-full gap-2 xl:gap-0'>
            <h2 className='body-medium xs:h3-bold lg:h1-semibold max-w-48 lg:max-w-72 xl:max-w-2xl text-overflow-ellipsis'>
              {id === sessionUser.$id ? sessionUser.name : user.name}
            </h2>
            {id === sessionUser.$id ? (
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
            )}
          </div>
          <h3 className='md:self-start self-center small-medium xs:base-medium text-light-3 '>
            @{id === sessionUser.id ? sessionUser.username : user.username}
          </h3>
          <div className='grid grid-flow-row xxs:flex place-items-center w-full max-w-lg gap-1 xxs:gap-0'>
            <Button className='shad-button_ghost small-medium md:body-medium'>
              <span className='text-primary-500'>
                {id === sessionUser?.$id
                  ? sessionUser.posts?.length || 0
                  : user.posts?.length || 0}
              </span>{' '}
              Posts
            </Button>
            <Button className='shad-button_ghost md:body-medium small-medium'>
              <span className='text-primary-500'>
                {id === sessionUser.$id
                  ? sessionUser.liked?.length || 0
                  : user.liked?.length || 0}
              </span>{' '}
              Liked
            </Button>
            <Button className='shad-button_ghost md:body-medium small-medium col-span-2'>
              <span className='text-primary-500'>
                {id === sessionUser.$id
                  ? sessionUser.followers?.length || 0
                  : user.followers?.length || 0}
              </span>{' '}
              Following
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-1 w-full'>
        <Tabs
          defaultValue={savedCollections[0].filter}
          className='flex flex-col xs:gap-8 xs:items-start gap-16 w-full'
        >
          <TabsList className='grid grid-flow-row xs:flex place-items-center w-full max-w-lg gap-1 xs:gap-0'>
            {savedCollections.map(({ filter, icon }, index) => (
              <TabsTrigger
                key={filter + icon}
                value={filter}
                className={`data-[state=active]:bg-dark-4 flex-center w-full small-medium lg:body-medium px-6 py-2 border gap-2 ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${
                  index === savedCollections.length - 1
                    ? 'rounded-r-lg col-span-2'
                    : ''
                } border-dark-4 group transition hover:bg-dark-4
                    `}
              >
                <img src={icon} alt='Link selection' width={20} height={20} />
                <p className='text-ellipsis'>{filter}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {savedCollections.map(({ filter }, index) => {
            const Component = getComponent(filter)
            return (
              <TabsContent key={index} value={filter}>
                <Component />
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
