import { TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { type FC, type ReactNode } from 'react'

export const TR: FC<{
  className?: string
  trigger: string
  Icon: ReactNode
}> = ({ className, trigger, Icon }) => {
  return (
    <TabsTrigger
      value={trigger}
      className={cn(
        'flex-center w-full small-medium px-6 py-2 border gap-2 lg:body-medium border-dark-4 group transition hover:bg-dark-4 data-[state=active]:bg-dark-4',
        className
      )}
    >
      {Icon}
      <p className='overflow-ellipsis'>{trigger}</p>
    </TabsTrigger>
  )
}

export const TC: FC<{
  className?: string
  trigger: string
  Content: ReactNode
}> = ({ className, trigger, Content }) => {
  return (
    <TabsContent value={trigger} className={className}>
      {Content}
    </TabsContent>
  )
}
