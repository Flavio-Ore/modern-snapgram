import { Button } from '@shared/ui'
import SavedIcon from '@shared/ui/icons/SavedIcon'
import SaveIcon from '@shared/ui/icons/SaveIcon'
import { BookmarkIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDeleteSavedPost } from '../model/useDeleteSavedPost'
import { useSavePost } from '../model/useSavePost'

export interface SaveButtonProps {
  postId: string
  userId: string
  savedRecordId?: string
  className?: string
}

export const SaveButton = ({
  postId,
  userId,
  savedRecordId: initialSavedRecordId = '',
  className
}: SaveButtonProps) => {
  const [savedRecordId, setSavedRecordId] = useState(initialSavedRecordId)
  const [isSaved, setIsSaved] = useState(initialSavedRecordId !== '')

  const { mutate: save, isPending: isSaving } = useSavePost()
  const { mutate: deleteSave, isPending: isDeletingSave } = useDeleteSavedPost()

  useEffect(() => {
    setSavedRecordId(initialSavedRecordId)
    setIsSaved(initialSavedRecordId !== '')
  }, [initialSavedRecordId])

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isSaved && savedRecordId !== '') {
      setIsSaved(false)
      deleteSave({ savedRecordId })
      return
    }
    setIsSaved(true)
    save({ postId, userId })
  }

  const isBusy = isSaving || isDeletingSave

  return (
    <div className={className}>
      {isBusy ? (
        <BookmarkIcon
          size={20}
          className='fill-primary-500/50 stroke-primary-500/50 animate-float cursor-not-allowed'
        />
      ) : (
        <Button
          variant='ghost'
          onClick={handleSave}
          className='px-2 text-light-1 hover:text-white'
        >
          {isSaved ? (
            <SavedIcon className='hover:fill-primary-500/50' />
          ) : (
            <SaveIcon className='hover:fill-primary-500/50' />
          )}
        </Button>
      )}
    </div>
  )
}

export default SaveButton
