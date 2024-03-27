import { Link, Outlet, useLocation } from 'react-router-dom'

const savedCollections = [
  {
    filter: 'Posts',
    icon: '/assets/icons/posts.svg',
    path: '/saved'
  },
  {
    filter: 'Reels',
    icon: '/assets/icons/posts.svg',
    path: '/saved/reels'
  },
  {
    filter: 'Collections',
    icon: '/assets/icons/posts.svg',
    path: '/saved/collections'
  }
]

const Saved = () => {
  const { pathname } = useLocation()
  return (
    <div className='common-container'>
      <div className='user-container'>
        <div className='flex-start w-full max-w-5xl gap-6'>
          <img
            src='/assets/icons/bookmark.svg'
            className='h-[28px] w-[28px] md:h-[36px] md:w-[36px] aspect-square invert-white'
            alt='people'
          />
          <h2 className='h3-bold md:h1-bold'>Saved</h2>
        </div>
        <div className='w-full flex-between'>
          <div className='flex-between xxs:flex-row flex-col gap-2  xxs:gap-0 flex-1 w-full max-w-lg mt-2 mb-2'>
            {savedCollections.map(({ path, filter, icon }, index) => (
              <Link
                key={index}
                to={path}
                className={`flex-start xxs:flex-center w-full gap-2 small-medium lg:body-medium px-3 py-2 border ${
                  index === 0 ? 'rounded-l-lg' : ''
                } ${
                  index === savedCollections.length - 1 ? 'rounded-r-lg' : ''
                } border-dark-4 group ${
                  pathname === path ? 'bg-dark-4' : 'bg-dark-2'
                }
                `}
              >
                <img src={icon} alt='Link selection' />
                <p>{filter}</p>
              </Link>
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Saved
