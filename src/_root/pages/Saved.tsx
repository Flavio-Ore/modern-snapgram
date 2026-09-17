import SaveIcon from '@/components/icons/SaveIcon'
import CustomTabs from '@/components/shared/app/CustomTabs'
import { SAVES_TRIGGERS } from '@/values/TabsTriggers'

const Saved = () => {
  return (
    <div className='saved-container'>
      <div className='common-inner_container'>
        <div className='flex flex-start w-full gap-3'>
          <SaveIcon className='size-9 fill-light-1'/>
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
