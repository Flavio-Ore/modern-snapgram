import ReelsIcon from '@/components/icons/ReelsIcon'

const Reels = () => {
  return (
    <div className='common-container'>
      <div className='flex-center gap-3'>
        <ReelsIcon className='size-9 fill-secondary-500' />
        <h1 className='h1-bold'>Search Reels</h1>
      </div>
      <div className='flex-center flex-col flex-1 p-8 gap-4'>
        <h2 className='font-bold leading-[140%] tracking-tighter text-center animate-pulse text-6xl text-primary-600/80'>Comming  soon...</h2>
        <p className='body-medium text-center'>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
      </div>
    </div>
  )
}

export default Reels
