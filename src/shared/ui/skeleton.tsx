import { cn } from '@shared/lib/cn'
import { type HTMLAttributes } from 'react'

function Skeleton ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary-600/20', className)}
      {...props}
    />
  )
}

export { Skeleton }

