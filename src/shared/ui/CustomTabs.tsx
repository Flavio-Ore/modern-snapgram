import { TabsContent, TabsTrigger } from './tabs'
import { type ReactNode } from 'react'

export interface TRProps {
  className?: string
  trigger: string
  Icon: ReactNode
}

export const TR = ({ trigger, Icon }: TRProps) => {
  return (
    <TabsTrigger value={trigger}>
      {Icon}
      <p className='pl-2 overflow-ellipsis'>{trigger}</p>
    </TabsTrigger>
  )
}

export interface TCProps {
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
