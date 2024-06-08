import DeleteIcon from '@/components/icons/DeleteIcon'
import FileUploadIcon from '@/components/icons/FileUploadIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  fieldChange: (files: File[]) => void
  mediaUrls?: string[]
}
const FileUploader = ({
  fieldChange,
  mediaUrls: mediaUrl
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([])
  console.log('files .>>', files)

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      console.log('acceptedFiles .>>', acceptedFiles)
      setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
    },
    [files]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.svg'],
      'video/*': ['.mp4']
    },
    maxFiles: 10,
    maxSize: 52_428_800
  })
  const handleRemoveFile =
    ({ fileName }: { fileName: string }) =>
      () => {
        setFiles(prevFiles => {
          const newFiles = prevFiles.filter(file => file.name !== fileName)
          return newFiles
        })
      }

  useEffect(() => {
    fieldChange(files)
  }, [files])
  return (
    <div
      className={cn(
        'flex flex-center flex-col bg-dark-3 rounded-xl border-dotted',
        {
          'border-spacing-4 border-primary-500': isDragActive
        }
      )}
    >
      <Input {...getInputProps()} className='cursor-pointer' />
      <div className='file_uploader-box' {...getRootProps()}>
        <FileUploadIcon />
        <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
        <p className='text-light-4 small-regular mb-6'>
          SVG, PNG, JPG, GIF or MP4 &#40;max. 52MB&#41;
        </p>
        <Button type='button' className='shad-button_dark_4 hover:bg-dark-2'>
          Select from computer
        </Button>
      </div>
      {files.map(file => {
        return (
          <div key={file.name} className='relative mb-8'>
            {['image/png', 'image/jpeg', 'image/svg+xml'].includes(
              file.type
            ) && (
              <img
                src={URL.createObjectURL(file)}
                alt='Image to post'
                className='file_uploader-img'
              />
            )}
            {file.type === 'video/mp4' && (
              <video
                src={URL.createObjectURL(file)}
                controls
                loop
                className='file_uploader-img cursor-pointer'
              />
            )}
            <Button
              className='absolute flex gap-3 top-5 right-5 z-50 bg-dark-1 rounded-full p-2 group hover:bg-dark-4/80'
              onClick={handleRemoveFile({ fileName: file.name })}
            >
              <DeleteIcon className='size-6' />
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default FileUploader
