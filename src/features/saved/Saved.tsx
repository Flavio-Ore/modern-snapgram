import { TC, TR } from '@/components/CustomTabs'
import CollectionsIcon from '@/components/icons/CollectionsIcon'
import PostsIcon from '@/components/icons/PostsIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import { cn } from '@/utils/cn'
import SavedCollections from '@saved/components/SavedCollections'
import SavedPosts from '@saved/components/SavedPosts'
import { Tabs, TabsList } from '@shadcn/tabs'

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

const Saved = () => {
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

export default Saved
