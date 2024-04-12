import CustomTabs from '@/components/shared/app/CustomTabs'
import { SAVES_TRIGGERS } from '@/values/tabsTriggers'

const Saved = () => {
  return (
    <div className='saved-container'>
      <div className='common-inner_container'>
        <div className='flex flex-start w-full gap-3'>
          <img
            src='/assets/icons/bookmark.svg'
            height={36}
            width={36}
            className='invert-white'
            alt='people'
          />
          <h2 className='h3-bold md:h1-bold'>Saved Posts</h2>
        </div>
        <div className='flex flex-1 w-full'>
          <CustomTabs tabsOperations={SAVES_TRIGGERS} />
        </div>
      </div>
    </div>
  )
}

export default Saved
