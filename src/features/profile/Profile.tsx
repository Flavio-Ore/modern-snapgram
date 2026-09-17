import { TC, TR } from '@/components/CustomTabs'
import PeopleIcon from '@/components/icons/PeopleIcon'
import PostsIcon from '@/components/icons/PostsIcon'
import { cn } from '@/utils/cn'
import UserPosts from '@posts/components/UserPosts'
import Followers from '@profile/components/Followers'
import Followings from '@profile/components/Followings'
import ProfileDetails from '@profile/components/ProfileDetails'
import { Tabs, TabsList } from '@shadcn/tabs'
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

const Profile = () => {
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

export default Profile
