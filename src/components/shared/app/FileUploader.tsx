import DeleteIcon from '@/components/icons/DeleteIcon'
import FileUploadIcon from '@/components/icons/FileUploadIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  fieldChange: (files: File[]) => void
  fileLimit: number
}

const FileUploaderImagePreview = ({ file }: { file: File }) => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!(file != null && imgRef.current != null)) {
      return
    }
    if (!(file instanceof File)) {
      return
    }
    const objectURL = URL.createObjectURL(file)
    imgRef.current.src = objectURL

    return () => {
      URL.revokeObjectURL(objectURL)
    }
  }, [file])

  return <img ref={imgRef} alt='Image to post' className='file_uploader-img' />
}

const FileUploaderVideoPreview = ({ file }: { file: File }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!(file != null && videoRef.current != null)) {
      return
    }
    const objectURL = URL.createObjectURL(file)
    videoRef.current.src = objectURL

    return () => {
      URL.revokeObjectURL(objectURL)
    }
  }, [file])

  return (
    <video
      ref={videoRef}
      controls
      loop
      className='file_uploader-img cursor-pointer'
    />
  )
}

const FileUploader = ({ fieldChange, fileLimit = 10 }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([])
  console.log('files .>>', files)
  console.log({ fileLimit })
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      console.log('acceptedFiles .>>', acceptedFiles)

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
        <Button type='button' className='shad-button_dark_4 hover:bg-dark-2'>
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
              <FileUploaderImagePreview file={file} />
                )
              : (
              <FileUploaderVideoPreview file={file} />
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
