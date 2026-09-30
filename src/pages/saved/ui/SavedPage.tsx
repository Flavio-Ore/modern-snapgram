import { cn } from '@shared/lib'
import { CollectionsIcon, PostsIcon, SaveIcon, TC, TR, Tabs, TabsList } from '@shared/ui'
import { SavedPosts } from '@widgets/post-feed'

const SavedCollections = () => (
  <div className='flex-center flex-col w-full py-10 text-light-4'>
    <h3 className='h3-bold'>No Collections yet</h3>
    <p className='body-medium'>Create collections to organize your saved posts.</p>
  </div>
)

const SavesTabs = [
  {
    trigger: 'Posts',
    Icon: PostsIcon,
    Content: SavedPosts
  },
  {
    trigger: 'Collections',
    Icon: CollectionsIcon,
    Content: SavedCollections
  }
]

export const SavedPage = () => {
  return (
    <div className='saved-container'>
      <div className='common-inner_container'>
        <div className='flex flex-start w-full gap-3'>
          <SaveIcon className='size-9 fill-primary-500' />
          <h2 className='md:h2-bold h3-bold'>Saved Posts</h2>
        </div>
        <div className='flex flex-1 w-full'>
          <Tabs
            defaultValue={SavesTabs[0].trigger}
            className='flex flex-col xxs:gap-8 gap-16 w-full'
          >
            <TabsList className='grid grid-flow-row xxs:flex-center w-full max-w-lg gap-1 xs:gap-0'>
              {SavesTabs.map(({ trigger, Icon }, index) => (
                <TR
                  key={trigger}
                  trigger={trigger}
                  Icon={<Icon />}
                  className={cn({
                    'rounded-l-lg': index === 0,
                    'rounded-r-lg col-span-2': index === SavesTabs.length - 1
                  })}
                />
              ))}
            </TabsList>
            {SavesTabs.map(({ trigger, Content }) => (
              <TC key={trigger} trigger={trigger} Content={<Content />} />
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SavedPage
