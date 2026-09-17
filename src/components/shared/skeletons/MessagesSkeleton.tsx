import { Skeleton } from '@/components/ui/skeleton'

const MessagesSkeleton = () => (
  <div className='flex flex-col justify-end gap-2 size-full'>
    <Skeleton className='py-4 w-1/2 bg-dark-2 rounded-xl' />
    <Skeleton className='py-4 w-1/3 rounded-xl' />
    <Skeleton className='self-end bg-primary-600 py-4 w-1/3 rounded-xl' />
    <Skeleton className='self-end bg-primary-500 py-4 w-1/2 rounded-xl' />
    <Skeleton className='py-4 w-1/2 bg-dark-2 rounded-xl' />
    <Skeleton className='py-4 w-1/3 rounded-xl' />
    <Skeleton className='self-end bg-primary-600 py-4 w-2/3 rounded-xl' />
    <Skeleton className='self-end bg-primary-500 py-4 w-1/3 rounded-xl' />
    <Skeleton className='py-4 w-1/2 bg-dark-2 rounded-xl' />
    <Skeleton className='py-4 w-1/3 rounded-xl' />
    <Skeleton className='self-end bg-primary-600 py-4 w-1/2 rounded-xl' />
    <Skeleton className='self-end bg-primary-500 py-4 w-1/3 rounded-xl' />
    <Skeleton className='py-4 w-1/2 bg-dark-2 rounded-xl' />
    <Skeleton className='py-4 w-1/3 rounded-xl' />
  </div>
)

export default MessagesSkeleton
