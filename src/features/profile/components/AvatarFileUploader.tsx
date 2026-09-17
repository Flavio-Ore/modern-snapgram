import { cn } from '@/utils/cn'
import { useCallback, useEffect, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  fieldChange: (files: File[]) => void
  avatarUrl: string
}
const AvatarFileUploader = ({ avatarUrl, fieldChange }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setfileUrl] = useState(avatarUrl)
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setfileUrl(URL.createObjectURL(acceptedFiles[0]))
    },
    [file]
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
  }, [])
  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex-center flex-col cursor-pointer w-full hover:bg-dark-4',
        {
          'bg-light-1/20': isDragActive
        }
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
