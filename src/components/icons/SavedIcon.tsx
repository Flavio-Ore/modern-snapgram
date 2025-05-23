import { cn } from '@/utils/cn'
import { type SVGProps } from 'react'

const SavedIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('fill-primary-500', className)}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.5 9.248v4.16c0 2.581 0 3.872-.612 4.435a1.86 1.86 0 0 1-1.052.483c-.823.094-1.783-.755-3.704-2.455-.85-.75-1.274-1.126-1.766-1.225a1.9 1.9 0 0 0-.732 0c-.492.099-.916.474-1.766 1.225-1.92 1.7-2.881 2.55-3.704 2.455a1.87 1.87 0 0 1-1.052-.483C2.5 17.28 2.5 15.99 2.5 13.41V9.248c0-3.574 0-5.361 1.098-6.471S6.464 1.667 10 1.667s5.303 0 6.402 1.11C17.5 3.887 17.5 5.674 17.5 9.247M6.875 5c0-.345.28-.625.625-.625h5a.625.625 0 1 1 0 1.25h-5A.625.625 0 0 1 6.875 5'
    />
  </svg>
)

export default SavedIcon
