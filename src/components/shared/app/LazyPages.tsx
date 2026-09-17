import Loader from '@/components/shared/app/Loader'
import React, { Suspense } from 'react'

const LazyPages: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}
export default LazyPages
