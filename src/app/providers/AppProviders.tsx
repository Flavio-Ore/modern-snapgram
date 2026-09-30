import { LoaderIcon, Skeleton, Toaster } from '@shared/ui'
import { Suspense, type PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './QueryProvider'

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <Skeleton className='flex-center h-dvh w-full'>
              <LoaderIcon />
            </Skeleton>
          }
        >
          {children}
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </QueryProvider>
  )
}

export default AppProviders
