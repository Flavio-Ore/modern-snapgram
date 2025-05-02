import LoaderIcon from '@/components/icons/LoaderIcon'
import { Skeleton } from '@shadcn/skeleton'

const AuthSkeleton = () => (
  <Skeleton className='common-container animate-pulse-fade-in flex-center backdrop-blur-sm size-full bg-primary-600/5 '>
    <LoaderIcon className='stroke-secondary-500' />
  </Skeleton>
)

export default AuthSkeleton
