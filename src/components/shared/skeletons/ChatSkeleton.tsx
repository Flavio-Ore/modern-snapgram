import PhoneIcon from '@/components/icons/PhoneIcon'
import SendIcon from '@/components/icons/SendIcon'
import VideoIcon from '@/components/icons/VideoIcon'
import MessagesSkeleton from '@/components/shared/skeletons/MessagesSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const ChatSkeleton = () => (
  <div className='flex-between flex-col basis-2/3 size-full h-[85dvh] bg-dark-1 rounded-xl border border-light-4/40 px-6 py-4 gap-y-2'>
    <div className='flex-between w-full'>
      <div className='flex items-center gap-3'>
        <div className="relative before:absolute before:rounded-full before:content-[''] before:bottom-0 before:right-0 before:size-4 before:bg-green-500 hover:before:animate-rubber-band hover:before:animate-iteration-count-infinite hover:before:animate-duration-[3000ms] before:z-50">
          <Skeleton className='size-14 rounded-full' />
        </div>
        <div className='flex gap-1 flex-col'>
          <Skeleton className='w-2/3 h-4' />
          <Skeleton className='w-1/2 h-2' />
        </div>
      </div>
      <div className='flex-center gap-4'>
        <PhoneIcon className='size-7 hover:stroke-primary-500/50 cursor-pointer' />
        <VideoIcon className='size-7 hover:stroke-primary-500/50 cursor-pointer' />
      </div>
    </div>
    <hr className='border w-full border-dark-4' />
    <div className='flex flex-col size-full max-h-[600px] custom-scrollbar overflow-y-scroll py-4'>
      <MessagesSkeleton />
    </div>
    <hr className='border w-full border-dark-4/80' />
    <div className='flex gap-x-4 w-full max-w-5xl'>
      <div className='shad-input w-full flex-auto'></div>
      <Skeleton className='size-12 hover:stroke-primary-500/50 cursor-pointer'>
        <SendIcon className='size-4' />
      </Skeleton>
    </div>
  </div>
)

export default ChatSkeleton
