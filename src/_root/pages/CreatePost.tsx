import PostForm from '@/components/forms/PostForm'
import CreatePostIcon from '@/components/icons/CreatePostIcon'
import { E_FORM_ACTIONS } from '@/values'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <CreatePostIcon width={40} height={40} className='fill-secondary-500' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>
        <PostForm action={E_FORM_ACTIONS.CREATE} />
      </div>
    </div>
  )
}

export default CreatePost
