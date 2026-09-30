import { CreatePostIcon } from '@shared/ui'
import { PostForm } from '@features/manage-post'

export const CreatePostPage = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <CreatePostIcon
            width={40}
            height={40}
            className='fill-secondary-500'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>
        <PostForm action='CREATE' />
      </div>
    </div>
  )
}

export default CreatePostPage
