import UserCard from '@/components/shared/UserCard'

const People = () => {
  return (
    <div className='common-container'>
      <div className='user-container'>
        <div className='flex-start w-full max-w-5xl gap-6'>
          <img
            src='/assets/icons/people.svg'
            className='h-[36px] w-[36px] aspect-square invert-white'
            alt='people'
          />
          <h2 className='md:h1-bold h3-bold'>All Users</h2>
        </div>
        <ul className='user-grid'>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(i => {
            const imgUrl = '/assets/icons/profile-placeholder.svg'
            const name = 'The Midudev'
            const mainFollower = 'Steban'
            const profileLink = `/profile/65e42bcc7cd2846e471b`
            return (
              <li key={i}>
                <UserCard
                  imgUrl={imgUrl}
                  name={name}
                  mainFollower={`@${mainFollower}`}
                  profileLink={profileLink}
                  role='ALL_USERS'
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default People
