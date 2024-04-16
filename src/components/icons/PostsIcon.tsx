import { cn } from '@/lib/utils'
import { type SVGProps, useId } from 'react'

const PostsIcon = ({ className }: SVGProps<SVGSVGElement>) => {
  const id = useId()
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('stroke-primary-500', className)}
    >
      <g clipPath={`url(#${id})`} strokeWidth='1.5'>
        <path d='M1.667 10c0-3.929 0-5.893 1.22-7.113S6.072 1.667 10 1.667s5.893 0 7.113 1.22 1.22 3.184 1.22 7.113c0 3.928 0 5.892-1.22 7.113-1.22 1.22-3.184 1.22-7.113 1.22-3.928 0-5.892 0-7.113-1.22-1.22-1.22-1.22-3.185-1.22-7.113Z' />
        <circle cx='13.333' cy='6.667' r='1.667' />
        <path
          d='m1.667 10.417 1.46-1.277a1.917 1.917 0 0 1 2.617.087l3.575 3.575c.572.572 1.474.65 2.136.185l.249-.175a2.5 2.5 0 0 1 3.11.187l2.686 2.418'
          strokeLinecap='round'
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path fill='#fff' d='M0 0h20v20H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}
export default PostsIcon
