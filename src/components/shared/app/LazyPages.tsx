import Loader from '@/components/shared/app/Loader'
import { type FC, type ReactNode, Suspense } from 'react'

const LazyPages: FC<{ children: ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}
export default LazyPages
