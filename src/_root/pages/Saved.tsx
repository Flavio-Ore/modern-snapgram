import { SavedCollections, SavedReels } from '@/App'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const savedCollections = [
  {
    filter: 'Posts',
    icon: '/assets/icons/posts.svg'
  },
  {
    filter: 'Reels',
    icon: '/assets/icons/posts.svg'
  },
  {
    filter: 'Collections',
    icon: '/assets/icons/posts.svg'
  }
]

const getComponent = (filter: string) => {
  switch (filter) {
    case 'Posts':
      return () => <div></div>
    case 'Reels':
      return SavedReels
    case 'Collections':
      return SavedCollections
    default:
      return () => <div>Not found</div>
  }
}

const Saved = () => {
  return (
    <div className='saved-container w-full'>
      <div className='flex flex-start w-full gap-3'>
        <img
          src='/assets/icons/bookmark.svg'
          className='hidden xs:block h-[28px] w-[28px] md:h-[36px] md:w-[36px] aspect-square invert-white'
          alt='people'
        />
        <h2 className='h3-bold md:h1-bold'>Saved Posts</h2>
      </div>
      <div className='flex flex-1 w-full'>
        <Tabs
          defaultValue={savedCollections[0].filter}
          className='flex flex-col xxs:gap-8 xxs:items-start gap-20 w-full'
        >
          <TabsList className='grid grid-flow-row xxs:flex place-items-center w-full max-w-lg gap-1 xxs:gap-0'>
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
                <img src={icon} alt='Link selection' className='' />
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

        {/* <div className='flex-between xxs:flex-row flex-col gap-2  xxs:gap-0 flex-1 w-full max-w-lg mt-2 mb-2'>
            {savedCollections.map(({ path, filter, icon }, index) => (
              <Link
                key={index}
                to={path}
                className={`flex-start xxs:flex-center w-full gap-2 small-medium lg:body-medium px-3 py-2 border ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${
                  index === savedCollections.length - 1 ? 'rounded-r-lg' : ''
                } border-dark-4 group transition hover:bg-dark-4 ${
                  pathname === path ? 'bg-dark-4' : 'bg-dark-2'
                }
                `}
              >
                <img src={icon} alt='Link selection' />
                <p>{filter}</p>
              </Link>
            ))}
          </div> */}
      </div>
      {/* <Outlet /> */}
    </div>
  )
}

export default Saved
