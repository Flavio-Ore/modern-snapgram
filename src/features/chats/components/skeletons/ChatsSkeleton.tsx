import { Skeleton } from '@shadcn/skeleton'

const ChatsSkeleton = () => (
  <>
    <div className="flex-between hover:bg-dark-3 pr-4 pb-2 after:content-[''] after:rounded-full after:bottom-0 after:left-3 after:size-3 after:bg-green-500 px-1">
      <div className='flex-start gap-4 py-4 w-full'>
        <Skeleton className='size-14 rounded-full' />
        <div className='flex flex-1 gap-2 flex-col w-full'>
          <Skeleton className=' h-4 w-3/4 xs:w-3/4 ' />
          <Skeleton className='h-3 w-2/3 xs:w-2/3' />
        </div>
      </div>
    </div>
    <hr className='border w-full border-dark-4' />
    <div className="flex-between hover:bg-dark-3 pr-4 pb-2 after:content-[''] after:rounded-full after:bottom-0 after:left-3 after:size-3 after:bg-green-500 px-1">
      <div className='flex-start gap-4 py-4 w-full'>
        <Skeleton className='size-14 rounded-full' />
        <div className='flex flex-1 gap-2 flex-col w-full'>
          <Skeleton className=' h-4 w-1/2 xs:w-3/4 ' />
          <Skeleton className='h-3 w-1/3 xs:w-2/3' />
        </div>
      </div>
    </div>
    <hr className='border w-full border-dark-4' />
    <div className="flex-between hover:bg-dark-3 pr-4 pb-2 after:content-[''] after:rounded-full after:bottom-0 after:left-3 after:size-3 after:bg-green-500 px-1">
      <div className='flex-start gap-4 py-4 w-full'>
        <Skeleton className='size-14 rounded-full' />
        <div className='flex flex-1 gap-2 flex-col w-full'>
          <Skeleton className=' h-4 w-1/2 xs:w-3/4 ' />
          <Skeleton className='h-3 w-1/3 xs:w-2/3' />
        </div>
      </div>
    </div>
    <hr className='border w-full border-dark-4' />
    <div className="flex-between hover:bg-dark-3 pr-4 pb-2 after:content-[''] after:rounded-full after:bottom-0 after:left-3 after:size-3 after:bg-green-500 px-1">
      <div className='flex-start gap-4 py-4 w-full'>
        <Skeleton className='size-14 rounded-full' />
        <div className='flex flex-1 gap-2 flex-col w-full'>
          <Skeleton className=' h-4 w-1/2 xs:w-3/4 ' />
          <Skeleton className='h-3 w-1/3 xs:w-2/3' />
        </div>
      </div>
    </div>
    <hr className='border w-full border-dark-4' />
    <div className="flex-between hover:bg-dark-3 pr-4 pb-2 after:content-[''] after:rounded-full after:bottom-0 after:left-3 after:size-3 after:bg-green-500 px-1">
      <div className='flex-start gap-4 py-4 w-full'>
        <Skeleton className='size-14 rounded-full' />
        <div className='flex flex-1 gap-2 flex-col w-full'>
          <Skeleton className=' h-4 w-1/2 xs:w-3/4 ' />
          <Skeleton className='h-3 w-1/3 xs:w-2/3' />
        </div>
      </div>
    </div>
    <hr className='border w-full border-dark-4' />
    <div className="flex-between hover:bg-dark-3 pr-4 pb-2 after:content-[''] after:rounded-full after:bottom-0 after:left-3 after:size-3 after:bg-green-500 px-1">
      <div className='flex-start gap-4 py-4 w-full'>
        <Skeleton className='size-14 rounded-full' />
        <div className='flex flex-1 gap-2 flex-col w-full'>
          <Skeleton className=' h-4 w-1/2 xs:w-3/4 ' />
          <Skeleton className='h-3 w-1/3 xs:w-2/3' />
        </div>
      </div>
    </div>
    <hr className='border w-full border-dark-4' />
  </>
)
export default ChatsSkeleton
