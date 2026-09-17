import LoaderIcon from '@/components/icons/LoaderIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { type FC, type ReactNode, Suspense } from 'react'

const LazyPages: FC<{ children: ReactNode }> = ({ children }) => {
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
