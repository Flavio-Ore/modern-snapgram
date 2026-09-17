import LoaderIcon from '@/components/icons/LoaderIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { type ReactNode, Suspense } from 'react'

const LazyPages = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Skeleton className='flex-center h-dvh w-full'>
          <LoaderIcon />
        </Skeleton>
      }
    >
      {children}
    </Suspense>
  )
}
export default LazyPages
