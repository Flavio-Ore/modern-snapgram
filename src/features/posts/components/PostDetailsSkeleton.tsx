import { Skeleton } from '@shadcn/skeleton'

const PostDetailsSkeleton = () => {
  return (
    <div className='post_details-card'>
      <Skeleton className='post_details-img basis-1/2' />
      <div className='post_details-info'>
        <div className='flex-between w-full gap-4'>
          <Skeleton className='rounded-full min-h-12 min-w-12' />
          <div className='flex gap-4 flex-col w-full'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-3 w-full' />
          </div>
        </div>

        <hr className='border w-full border-dark-4/80' />

        <div className='flex-between flex-col gap-8 w-full'>
          <div className='flex items-center space-x-4 w-full'>
            <Skeleton className='min-h-12 min-w-12 rounded-full' />
            <div className='space-y-2  w-full '>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>

          <div className='flex items-center space-x-4 w-full'>
            <Skeleton className='min-h-12 min-w-12 rounded-full' />
            <div className='space-y-2  w-full '>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>

          <div className='flex items-center space-x-4 w-full'>
            <Skeleton className='min-h-12 min-w-12 rounded-full' />
            <div className='space-y-2  w-full'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>

          <div className='flex items-center space-x-4 w-full'>
            <Skeleton className='min-h-12 min-w-12 rounded-full' />
            <div className='space-y-2  w-full'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>
        </div>

        <div className='flex-center flex-1 place-items-end w-full gap-4'>
          <Skeleton className='min-h-12 min-w-12 rounded-full' />
          <Skeleton className='h-12 w-full' />
        </div>
      </div>
    </div>
  )
}

export default PostDetailsSkeleton
