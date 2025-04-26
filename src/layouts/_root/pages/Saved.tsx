import CollectionsIcon from '@/components/icons/CollectionsIcon'
import PostsIcon from '@/components/icons/PostsIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import { TC, TR } from '@/components/shared/app/CustomTabs'
import SavedCollections from '@/components/shared/saves/SavedCollections'
import SavedPosts from '@/components/shared/saves/SavedPosts'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useAuth } from '@/states/TanStack-query/hooks/queries/session/useAuth'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const SavesTabs = [
  {
    trigger: 'Posts',
    Icon: PostsIcon,
    Content: SavedPosts
  },
  {
    trigger: 'Collections',
    Icon: CollectionsIcon,
    Content: SavedCollections
  }
]

const Saved = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { data: auth, refetch } = useAuth()
  const authentication = useMemo(
    () => ({
      isAuthenticated: auth?.data ?? false,
      errorCode: auth?.code ?? false
    }),
    [auth]
  )
  useEffect(() => {
    refetch()
  }, [])
  useEffect(() => {
    if (!authentication.isAuthenticated || authentication.errorCode === 401) {
      toast({
        title: 'Session expired',
        description: 'Please sign in again to continue.',
        variant: 'destructive'
      })
      navigate('/sign-in')
    }
  }, [auth])
  return (
    <div className='saved-container'>
      <div className='common-inner_container'>
        <div className='flex flex-start w-full gap-3'>
          <SaveIcon className='size-9 fill-primary-500' />
          <h2 className='md:h2-bold h3-bold'>Saved Posts</h2>
        </div>
        <div className='flex flex-1 w-full'>
          <Tabs
            defaultValue={SavesTabs[0].trigger}
            className='flex flex-col xxs:gap-8 gap-16 w-full'
          >
            <TabsList className='grid grid-flow-row xxs:flex-center w-full max-w-lg gap-1 xs:gap-0'>
              {SavesTabs.map(({ trigger, Icon }, index) => (
                <TR
                  key={trigger}
                  trigger={trigger}
                  Icon={<Icon />}
                  className={cn({
                    'rounded-l-lg': index === 0,
                    'rounded-r-lg col-span-2': index === SavesTabs.length - 1
                  })}
                />
              ))}
            </TabsList>
            {SavesTabs.map(({ trigger, Content }) => (
              <TC key={trigger} trigger={trigger} Content={<Content />} />
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Saved
