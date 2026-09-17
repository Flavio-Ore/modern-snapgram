import PostForm from '@/components/forms/PostForm'
import { E_FORM_ACTIONS } from '@/values'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img
            src='/assets/icons/add-post.svg'
            width={36}
            height={36}
            alt='add'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm action={E_FORM_ACTIONS.CREATE} />
      </div>
    </div>
  )
}

export default CreatePost
