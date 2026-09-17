import { cn } from '@/lib/utils'
import { type SVGProps } from 'react'

const FilterIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('fill-light-4', className)}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M18.958 5.834c0 .345-.28.625-.625.625H1.667a.625.625 0 0 1 0-1.25h16.666c.346 0 .625.28.625.625M16.458 10c0 .345-.28.625-.625.625H4.167a.625.625 0 1 1 0-1.25h11.666c.346 0 .625.28.625.625m-2.5 4.167c0 .345-.28.624-.625.624H6.667a.625.625 0 1 1 0-1.25h6.666c.346 0 .625.28.625.625'
    />
  </svg>
)

export default FilterIcon
