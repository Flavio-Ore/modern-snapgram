import PostForm from '@/components/forms/PostForm'
import CreatePostIcon from '@/components/icons/CreatePostIcon'
import Loader from '@/components/shared/app/Loader'
import { useGetPostById } from '@/lib/queries/queries'
import { E_FORM_ACTIONS } from '@/values'
import { useParams } from 'react-router-dom'

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById({ postId: id ?? '' })

  if (isPending) return <Loader />

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <CreatePostIcon className='size-9 fill-secondary-500'/>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>
        <PostForm action={E_FORM_ACTIONS.UPDATE} post={post} />
      </div>
    </div>
  )
}

export default EditPost
