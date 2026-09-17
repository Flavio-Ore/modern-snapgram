import { TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface TRProps {

  className?: string
  trigger: string
  Icon: ReactNode
}
export const TR = ({ className, trigger, Icon }: TRProps) => {
  return (
    <TabsTrigger
      value={trigger}
      className={cn(
        'flex-center w-full small-medium px-6 py-2 border lg:base-regular border-dark-2 group transition hover:bg-dark-3 data-[state=active]:bg-dark-3',
        className
      )}
    >
      {Icon}
      <p className='pl-2 overflow-ellipsis'>{trigger}</p>
    </TabsTrigger>
  )
}

interface TCProps {
  className?: string
  trigger: string
  Content: ReactNode
}
export const TC = ({ className, trigger, Content }: TCProps) => {
  return (
    <TabsContent value={trigger} className={className}>
      {Content}
    </TabsContent>
  )
}
