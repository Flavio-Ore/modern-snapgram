import FileUploadIcon from '@/components/icons/FileUploadIcon'
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'

interface FileUploaderProps {
  fieldChange: (files: File[]) => void
  mediaUrl: string
}
const FileUploader: React.FC<FileUploaderProps> = ({
  fieldChange,
  mediaUrl
}) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setfileUrl] = useState(mediaUrl)

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
  return (
    <div
      {...getRootProps()}
      className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
    >
      <input {...getInputProps()} className='cursor-pointer' />
      {fileUrl != null && fileUrl.trim().length > 0
        ? (
        <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img
              src={fileUrl}
              alt='Image to post'
              className='file_uploader-img'
            />
          </div>
          <p className='file_uploader-label'>Click or drag photo to replace</p>
        </>
          )
        : (
        <div className='file_uploader-box'>
          <FileUploadIcon />
          <h3 className='base-medium text-light-2 mb-2 mt-6'>
            Drag photo here
          </h3>
          <p className='text-light-4 small-regular mb-6'>
            SVG, PNG, JPG or GIF &#40;max. 800x400px&#41;
          </p>

          <Button type='button' className='shad-button_dark_4'>
            Select from computer
          </Button>
        </div>
          )}
    </div>
  )
}

export default FileUploader
