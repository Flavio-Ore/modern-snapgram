import { MoonIcon } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='common-container flex-center'>
      <div className='p-8 flex-center flex-col gap-4'>
        <h2 className='font-bold leading-[140%] tracking-tighter text-center animate-pulse text-9xl text-primary-600/80'>
          404
        </h2>
        <h3 className='h1-bold text-center'>Not found : &#40;</h3>
        <MoonIcon size={600} className='absolute -z-50 animate-swing stroke-light-4 fill-light-4 opacity-20' />
        <p className='body-medium text-center'>
          The content you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
      </div>
    </div>
  )
}

export default NotFound
