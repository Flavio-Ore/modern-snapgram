import DeleteIcon from '@/components/icons/DeleteIcon'
import { Button } from '@/components/ui/button'
import { type FileModelWithUrl, type Post } from '@/types'
import { ImageDownIcon } from 'lucide-react'

const PreviousFiles = ({
  filesModelsWithUrl,
  onDelete
}: {
  filesModelsWithUrl: Post['files']
  onDelete: (fileId: FileModelWithUrl['$id']) => () => void
}) => (
  <div className='flex flex-center flex-col bg-dark-3 rounded-xl border-dotted border-spacing-4 border-secondary-500'>
    <div className='flex-center flex-col p-7 h-36 lg:h-48'>
      <ImageDownIcon strokeWidth={1.1} size={60} className='stroke-light-4' />
      <h3 className='base-medium text-light-3 mb-2 mt-6'>
        Delete the previous ones!
      </h3>
    </div>
    {filesModelsWithUrl.map(file => {
      const isImage = [
        'image/png',
        'image/jpeg',
        'image/svg+xml',
        'image/gif'
      ].includes(file.mimeType)
      return (
        <div key={file.$id} className='relative mb-8'>
          {isImage
            ? (
            <img
              src={file.url}
              alt='Image to update'
              className='file_uploader-img'
            />
              )
            : (
            <video
              src={file.url}
              controls
              loop
              className='file_uploader-img cursor-pointer'
            />
              )}
          <Button
            type='button'
            className='absolute flex gap-3 top-5 right-5 z-50 bg-dark-1 rounded-full p-2 group hover:bg-dark-4/80'
            onClick={onDelete(file.$id)}
          >
            <DeleteIcon className='size-6' />
          </Button>
        </div>
      )
    })}
  </div>
)

export default PreviousFiles
