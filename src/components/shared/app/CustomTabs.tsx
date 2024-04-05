import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { TabsTriggers } from '@/types'

interface TabsContentsProps {
  triggers: Omit<TabsTriggers, 'icon'>[]
}
const TabsContents: React.FC<TabsContentsProps> = ({ triggers }) =>
  triggers.map(trigger => (
    <TabsContent key={trigger.trigger} value={trigger.trigger}>
      {trigger.Element()}
    </TabsContent>
  ))

interface TabsTriggersProps {
  className: string
  triggersAndIcons: Omit<TabsTriggers, 'Element'>[]
}
const TabTriggers: React.FC<TabsTriggersProps> = ({
  className,
  triggersAndIcons
}) =>
  triggersAndIcons.map(({ trigger, icon }, index) => (
    <TabsTrigger
      value={trigger}
      className={cn(
        className,
        index === 0 && 'rounded-l-lg',
        index === triggersAndIcons.length - 1 && 'rounded-r-lg col-span-2'
      )}
      key={trigger + icon}
    >
      <img src={icon} alt='Link selection' width={20} height={20} />
      <p className='text-ellipsis'>{trigger}</p>
    </TabsTrigger>
  ))

interface CustomTabsProps {
  tabsOperations: TabsTriggers[]
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabsOperations }) => (
  <Tabs
    defaultValue={tabsOperations[0].trigger}
    className='flex flex-col xxs:gap-8 gap-16 w-full'
  >
    <TabsList className='grid grid-flow-row xxs:flex-center w-full max-w-lg gap-1 xs:gap-0'>
      <TabTriggers
        triggersAndIcons={tabsOperations}
        className={cn(
          'flex-center w-full small-medium px-6 py-2 border gap-2',
          'lg:body-medium',
          'border-dark-4 group transition hover:bg-dark-4',
          'data-[state=active]:bg-dark-4'
        )}
      />
    </TabsList>
    <TabsContents triggers={tabsOperations} />
  </Tabs>
)

export default CustomTabs
