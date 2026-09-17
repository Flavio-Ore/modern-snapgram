import CollectionsIcon from '@/components/icons/CollectionsIcon'
import PostsIcon from '@/components/icons/PostsIcon'
import ReelsIcon from '@/components/icons/ReelsIcon'
import { TC, TR } from '@/components/shared/app/CustomTabs'
import ProfileDetails from '@/components/shared/profile/ProfileDetails'
import { SavedCollections, SavedReels } from '@/components/shared/saves'
import UserPosts from '@/components/shared/users/UserPosts'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const ProfileTriggers = [
  {
    trigger: 'Posts',
    Icon: PostsIcon,
    Content: UserPosts
  },
  {
    trigger: 'Reels',
    Icon: ReelsIcon,
    Content: SavedReels
  },
  {
    trigger: 'Collections',
    Icon: CollectionsIcon,
    Content: SavedCollections
  }
]

const Profile = () => {
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
            <TC key={trigger} trigger={trigger} Content={<Content />} />
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
