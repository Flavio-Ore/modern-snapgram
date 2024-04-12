import { Skeleton } from '@/components/ui/skeleton'
import { type FC, type ReactNode, Suspense } from 'react'
import Loader from './Loader'

const LazyPages: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className='flex h-dvh'>
          <Skeleton className='flex-center animate-ping size-full bg-primary-600/50'>
            <Loader />
          </Skeleton>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
export default LazyPages
