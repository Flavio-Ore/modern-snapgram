import { cn } from '@shared/lib/cn'
import { useCallback, useEffect, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'

export interface AvatarFileUploaderProps {
  fieldChange: (files: File[]) => void
  avatarUrl: string
  className?: string
}

export const AvatarFileUploader = ({
  avatarUrl,
  fieldChange,
  className
}: AvatarFileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(avatarUrl)

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    },
    [file, fieldChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    }
  })

  useEffect(() => {
    return () => {
      if (fileUrl !== '') {
        URL.revokeObjectURL(fileUrl)
      }
    }
  }, [fileUrl])

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex-center flex-col cursor-pointer w-full hover:bg-dark-4 rounded-lg',
        {
          'bg-light-1/20': isDragActive
        },
        className
      )}
    >
      <input {...getInputProps()} type='file' className='cursor-pointer' />
      <div className='flex-start flex-1 gap-4 w-full py-5 lg:py-10'>
        <img
          src={
            fileUrl === '' ? '/assets/icons/profile-placeholder.svg' : fileUrl
          }
          alt='New Avatar Image'
          height={100}
          width={100}
          loading='lazy'
          className='rounded-full aspect-square object-cover'
        />
        <p className='body-medium text-[#0095F6]'>Change profile photo</p>
      </div>
    </div>
  )
}

export default AvatarFileUploader
