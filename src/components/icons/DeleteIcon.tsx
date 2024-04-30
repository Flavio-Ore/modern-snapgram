import { cn } from '@/lib/utils'
import { type SVGProps } from 'react'

const DeleteIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('fill-red-500', className)}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.264 6.46a.625.625 0 0 1 .665.582l.383 5.75c.075 1.122.129 1.904.246 2.492.113.57.272.872.5 1.085s.54.352 1.116.427c.595.078 1.378.079 2.504.079h.644c1.126 0 1.91-.001 2.504-.079.576-.075.888-.214 1.116-.427s.387-.515.5-1.085c.117-.588.17-1.37.246-2.493l.383-5.75a.625.625 0 1 1 1.247.084l-.386 5.793c-.071 1.069-.129 1.933-.264 2.61-.14.704-.379 1.293-.872 1.754s-1.096.66-1.808.753c-.685.09-1.55.09-2.622.09h-.732c-1.071 0-1.937 0-2.622-.09-.712-.093-1.315-.292-1.808-.753s-.732-1.05-.872-1.754c-.135-.678-.193-1.541-.264-2.61l-.386-5.793a.625.625 0 0 1 .582-.665M8.63 1.875h-.04c-.18 0-.337 0-.486.023a1.88 1.88 0 0 0-1.367.986 3 3 0 0 0-.176.453l-.012.037-.08.243-.025.07a1.04 1.04 0 0 1-1.028.688h-2.5a.625.625 0 1 0 0 1.25h14.166a.625.625 0 0 0 0-1.25h-2.575a1.04 1.04 0 0 1-.977-.758l-.08-.243-.013-.037a3 3 0 0 0-.176-.453 1.88 1.88 0 0 0-1.367-.986 3 3 0 0 0-.486-.023h-2.78M7.62 4.113q-.048.135-.113.262h4.986a2 2 0 0 1-.113-.262l-.033-.095-.083-.249a3 3 0 0 0-.11-.308.63.63 0 0 0-.456-.328 3 3 0 0 0-.327-.008H8.629c-.24 0-.29.002-.327.008a.63.63 0 0 0-.455.328c-.018.034-.035.08-.111.308l-.083.25z'
    />
  </svg>
)
export default DeleteIcon
