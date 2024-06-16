import { Button } from '@/components/ui/button'
import { type UserStats } from '@/types'

interface ProfileStatsProps {
  stats: UserStats
}
const ProfileStats = ({ stats }: ProfileStatsProps) => (
  <div className='grid grid-flow-row xxs:flex place-items-center w-full max-w-lg gap-1 xxs:gap-0'>
    {stats.map(({ name, value }) => (
      <Button
        key={name}
        className='shad-button_ghost small-medium md:body-medium'
      >
        <span className='text-primary-500'>{value}</span> {name}
      </Button>
    ))}
  </div>
)

export default ProfileStats
