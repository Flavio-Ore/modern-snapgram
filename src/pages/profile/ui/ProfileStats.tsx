import { Button } from '@shared/ui'
import { type UserStats } from '@shared/types'

export const ProfileStats = ({ stats }: { stats: UserStats }) => {
  return (
    <div className='flex gap-8 xs:gap-14 items-center justify-center z-20 flex-wrap'>
      {stats.map(stat => (
        <div key={stat.name} className='flex-center gap-2'>
          <Button
            variant='link'
            className='hover:no-underline body-bold hover:text-light-2 text-primary-500 cursor-pointer p-0'
          >
            {stat.value}
          </Button>
          <p className='small-medium md:base-medium text-light-2'>{stat.name}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfileStats
