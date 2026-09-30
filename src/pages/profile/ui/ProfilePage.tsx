import { PeopleIcon, PostsIcon, TC, TR, Tabs, TabsList } from '@shared/ui'
import { cn } from '@shared/lib'
import Followers from './Followers'
import Followings from './Followings'
import ProfileDetails from './ProfileDetails'
import { UserPosts } from '@widgets/post-feed'
import { useParams } from 'react-router-dom'

const ProfileTriggers = [
  {
    trigger: 'Posts',
    Icon: PostsIcon,
    Content: UserPosts
  },
  {
    trigger: 'Followers',
    Icon: PeopleIcon,
    Content: Followers
  },
  {
    trigger: 'Following',
    Icon: PeopleIcon,
    Content: Followings
  }
]

export const ProfilePage = () => {
  const { id: userId } = useParams()

  return (
    <div className='profile-container'>
      <ProfileDetails />
      <div className='flex w-full max-w-5xl'>
        <Tabs
          defaultValue={ProfileTriggers[0].trigger}
          className='flex flex-col xxs:gap-8 gap-16 w-full'
        >
          <TabsList className='grid grid-flow-row xxs:flex-center w-full max-w-lg gap-1 xs:gap-0'>
            {ProfileTriggers.map(({ trigger, Icon }, index) => (
              <TR
                key={trigger}
                trigger={trigger}
                Icon={<Icon />}
                className={cn({
                  'rounded-l-lg': index === 0,
                  'rounded-r-lg col-span-2':
                    index === ProfileTriggers.length - 1
                })}
              />
            ))}
          </TabsList>
          {ProfileTriggers.map(({ trigger, Content }) => (
            <TC
              key={trigger}
              trigger={trigger}
              Content={<Content userId={userId ?? ''} />}
            />
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage
