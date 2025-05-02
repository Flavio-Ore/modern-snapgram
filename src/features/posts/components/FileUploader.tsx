import DeleteIcon from '@/components/icons/DeleteIcon'
import FileUploadIcon from '@/components/icons/FileUploadIcon'
import { cn } from '@/utils/cn'
import {
  FilePreviewImage,
  VideoFilePreview
} from '@posts/components/FilesPreviews'
import { Button } from '@shadcn/button'
import { Input } from '@shadcn/input'
import { useCallback, useEffect, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  fieldChange: (files: File[]) => void
  fileLimit: number
}

const FileUploader = ({ fieldChange, fileLimit = 10 }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const filteredFiles = acceptedFiles.filter(
        (file, i) =>
          file.name.match(/\.(jpg|png|svg|gif|mp4)$/) != null &&
          file.name !== files[i]?.name &&
          file.size !== files[i]?.size &&
          file.type !== files[i]?.type &&
          file.lastModified !== files[i]?.lastModified
      )
      setFiles(prevFiles => [...prevFiles, ...filteredFiles])
    },
    [files]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': ['.jpg'],
      'image/svg+xml': [],
      'image/gif': [],
      'video/mp4': []
    },
    maxFiles: fileLimit,
    maxSize: 52_428_800
  })
  const handleRemoveFile =
    ({ file }: { file: File }) =>
      () => {
        setFiles(prevFiles => {
          return prevFiles.filter(prevFile => prevFile.name !== file.name)
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
        <h3 className='base-medium text-light-3 mb-2 mt-6'>Drag files here!</h3>
        <p className='text-light-4 small-regular mb-3'>
          SVG, PNG, JPG, GIF or MP4 &#40;max. 52MB&#41;
        </p>
        <p className='text-red-400/60 small-regular mb-6'>
          JPG is accepted but JPEG is not!
        </p>
        <Button
          type='button'
          variant='ghost'
          className='shad-button_dark_4 hover:bg-dark-2'
        >
          Select from computer
        </Button>
      </div>
      {files.map(file => {
        return (
          <div key={file.name} className='relative mb-8'>
            {['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif'].includes(
              file.type
            )
              ? (
              <FilePreviewImage file={file} />
                )
              : (
              <VideoFilePreview file={file} />
                )}
            <Button
              className='absolute flex gap-3 top-5 right-5 z-50 bg-dark-1 rounded-full p-2 group hover:bg-dark-4/80'
              onClick={handleRemoveFile({ file })}
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
