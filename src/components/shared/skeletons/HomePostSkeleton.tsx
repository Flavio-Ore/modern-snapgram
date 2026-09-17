import { Skeleton } from '@/components/ui/skeleton'

const HomePostSkeleton = () => {
  return (
    <div className='post-card'>
      <div className='flex-start gap-4'>
        <Skeleton className='min-w-14 min-h-14 rounded-full' />
        <div className='flex items-start w-full flex-col gap-3'>
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-2 w-1/2' />
        </div>
      </div>

      <div className='flex-center flex-col gap-2 py-5'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-3 w-full' />
      </div>
      <Skeleton className='post-card_img' />
      <div className='flex-between'>
        <Skeleton className='min-w-5 min-h-5 rounded-full' />
        <Skeleton className='min-w-5 min-h-5 rounded-full' />
      </div>
    </div>
  )
}

export default HomePostSkeleton
