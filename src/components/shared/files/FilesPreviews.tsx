import { useEffect, useRef } from 'react'

const FilePreviewImage = ({ file }: { file: File }) => {
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

  return (
    <img
      ref={imgRef}
      alt='Image to post'
      className='file_uploader-img'
      loading='lazy'
    />
  )
}
const VideoFilePreview = ({ file }: { file: File }) => {
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

export { FilePreviewImage, VideoFilePreview }

