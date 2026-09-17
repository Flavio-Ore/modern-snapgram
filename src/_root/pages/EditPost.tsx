import PostForm from '@/components/forms/PostForm'
import Loader from '@/components/shared/Loader'
import { useGetPostById } from '@/lib/queries/queries'
import { E_FORM_ACTIONS } from '@/values'
import { useParams } from 'react-router-dom'

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById({ postId: id || '' })

  if (isPending) return <Loader />

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
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        <PostForm action={E_FORM_ACTIONS.UPDATE} post={post} />
      </div>
    </div>
  )
}

export default EditPost
