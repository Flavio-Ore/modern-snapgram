import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { type TabsTriggers } from '@/types'
import { type FC } from 'react'

interface TabsContentsProps {
  triggers: Array<Omit<TabsTriggers, 'icon'>>
}
const TabsContents: FC<TabsContentsProps> = ({ triggers }) =>
  triggers.map(({ trigger, Element }) => (
    <TabsContent key={trigger} value={trigger}>
      {Element}
    </TabsContent>
  ))

interface TabsTriggersProps {
  className: string
  triggersAndIcons: Array<Omit<TabsTriggers, 'Element'>>
}
const TabTriggers: FC<TabsTriggersProps> = ({ className, triggersAndIcons }) =>
  triggersAndIcons.map(({ trigger, Icon }, index) => (
    <TabsTrigger
      key={trigger}
      value={trigger}
      className={cn(
        className,
        index === 0 && 'rounded-l-lg',
        index === triggersAndIcons.length - 1 && 'rounded-r-lg col-span-2'
      )}
    >
      {Icon}
      <p className='overflow-ellipsis'>{trigger}</p>
    </TabsTrigger>
  ))

interface CustomTabsProps {
  tabsOperations: TabsTriggers[]
}
const CustomTabs: FC<CustomTabsProps> = ({ tabsOperations }) => (
  <Tabs
    defaultValue={tabsOperations[0].trigger}
    className='flex flex-col xxs:gap-8 gap-16 w-full'
  >
    <TabsList className='grid grid-flow-row xxs:flex-center w-full max-w-lg gap-1 xs:gap-0'>
      <TabTriggers
        triggersAndIcons={tabsOperations}
        className={
          'flex-center w-full small-medium px-6 py-2 border gap-2 lg:body-medium border-dark-4 group transition hover:bg-dark-4 data-[state=active]:bg-dark-4'
        }
      />
    </TabsList>
    <TabsContents triggers={tabsOperations} />
  </Tabs>
)

export default CustomTabs
