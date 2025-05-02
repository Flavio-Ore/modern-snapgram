import { cn } from '@/utils/cn'
import { type SVGProps } from 'react'

const ChatsIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    width='22'
    height='22'
    viewBox='0 0 22 22'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('fill-primary-500', className)}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 1.75A9.25 9.25 0 0 0 1.75 11c0 1.481.348 2.879.965 4.118.248.498.343 1.092.187 1.676l-.596 2.226a.55.55 0 0 0 .673.674l2.227-.596a2.38 2.38 0 0 1 1.676.187A9.2 9.2 0 0 0 11 20.25a9.25 9.25 0 0 0 0-18.5M.25 11C.25 5.063 5.063.25 11 .25S21.75 5.063 21.75 11 16.937 21.75 11 21.75c-1.718 0-3.344-.404-4.787-1.122a.9.9 0 0 0-.62-.08l-2.226.595c-1.524.408-2.918-.986-2.51-2.51l.596-2.226a.9.9 0 0 0-.08-.62A10.7 10.7 0 0 1 .25 11m6-1.5A.75.75 0 0 1 7 8.75h8a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75'
    />
  </svg>
)

export default ChatsIcon
