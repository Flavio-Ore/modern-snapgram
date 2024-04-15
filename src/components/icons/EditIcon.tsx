import { cn } from '@/lib/utils'
import { type SVGProps } from 'react'

const EditIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg
    width='36'
    height='36'
    viewBox='0 0 36 36'
    xmlns='http://www.w3.org/2000/svg'
    className={cn('fill-primary-500', className)}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.914 1.875h2.336a1.125 1.125 0 0 1 0 2.25H18c-3.567 0-6.13.002-8.08.265-1.917.257-3.073.748-3.928 1.602-.854.855-1.345 2.01-1.602 3.928-.263 1.95-.265 4.513-.265 8.08s.002 6.13.265 8.08c.257 1.917.748 3.073 1.602 3.928.855.854 2.01 1.345 3.928 1.602 1.95.263 4.513.265 8.08.265s6.13-.002 8.08-.265c1.917-.257 3.073-.748 3.928-1.602.854-.855 1.345-2.01 1.602-3.928.263-1.95.265-4.513.265-8.08v-2.25a1.125 1.125 0 0 1 2.25 0v2.336c0 3.463 0 6.176-.285 8.293-.291 2.168-.899 3.878-2.241 5.22s-3.052 1.95-5.22 2.241c-2.117.285-4.83.285-8.293.285h-.172c-3.463 0-6.176 0-8.293-.285-2.168-.291-3.878-.899-5.22-2.241s-1.95-3.052-2.241-5.22c-.285-2.117-.285-4.83-.285-8.293v-.172c0-3.463 0-6.176.285-8.293.291-2.168.899-3.878 2.241-5.22s3.052-1.95 5.22-2.241c2.117-.285 4.83-.285 8.293-.285m7.242 1.539a5.254 5.254 0 1 1 7.43 7.43l-9.972 9.972c-.557.557-.906.906-1.295 1.21a8 8 0 0 1-1.48.914c-.445.213-.914.369-1.66.618L13.82 25.01a2.238 2.238 0 0 1-2.831-2.831l1.452-4.357c.25-.747.405-1.215.618-1.661q.376-.79.914-1.48c.304-.39.653-.738 1.21-1.295zm5.84 1.59a3.004 3.004 0 0 0-4.25 0l-.564.566q.05.218.148.506c.215.62.622 1.436 1.39 2.204a5.8 5.8 0 0 0 2.204 1.39q.288.098.506.148l.565-.565a3.004 3.004 0 0 0 0-4.248m-2.338 6.587a8.1 8.1 0 0 1-2.529-1.72 8.1 8.1 0 0 1-1.72-2.529l-7.583 7.583c-.625.625-.87.873-1.078 1.14a5.8 5.8 0 0 0-.657 1.064c-.146.305-.258.635-.537 1.474l-.648 1.943 1.548 1.548 1.943-.648c.839-.279 1.169-.391 1.474-.537q.568-.27 1.064-.657c.267-.208.515-.453 1.14-1.078z'
    />
  </svg>
)

export default EditIcon