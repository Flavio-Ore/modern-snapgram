import { Skeleton } from '../skeleton'

export const AllUsersSkeleton = () => (
  <div className='user-grid'>
    {Array.from({ length: 9 }).map((_, index) => (
      <div key={index} className='user-card'>
        <Skeleton className='min-h-24 min-w-24 rounded-full' />
        <div className='flex-center flex-col gap-2 w-full'>
          <Skeleton className='h-6 w-4/6' />
          <Skeleton className='h-4 w-9/12' />
        </div>
        <Skeleton className='h-6 w-[88.750px] rounded-lg bg-dark-4' />
      </div>
    ))}
  </div>
)

export default AllUsersSkeleton
