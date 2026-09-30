import { type FileModelWithUrl } from '../model/types'
import { cn } from '@shared/lib/cn'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@shared/ui'
import { CircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface PostMediaCarouselProps {
  files?: FileModelWithUrl[]
  className?: string
}

export const PostMediaCarousel = ({
  files = [],
  className = ''
}: PostMediaCarouselProps) => {
  const mediaFiles = files ?? []
  const [emblaApi, setEmblaApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const handleDotClick = (index: number) => () => {
    if (emblaApi == null) return
    emblaApi.scrollTo(index)
  }

  useEffect(() => {
    if (emblaApi == null) return
    setCurrent(emblaApi.selectedScrollSnap() + 1)

    emblaApi.on('select', () => {
      setCurrent(emblaApi.selectedScrollSnap() + 1)
    })
  }, [emblaApi, mediaFiles])

  return (
    <Carousel setApi={setEmblaApi} className={cn('group', className)}>
      <CarouselContent>
        {mediaFiles.length === 0 && (
          <CarouselItem>
            <div className='p-1'>
              <img
                src='/assets/icons/file-upload.svg'
                alt='Post image'
                loading='lazy'
                className='post_details-img'
              />
            </div>
          </CarouselItem>
        )}
        {mediaFiles.length > 0 &&
          mediaFiles.map((file) => {
            const fileId = file?.$id ?? Math.random().toString()
            const mimeType = file?.mimeType ?? ''
            const url = file?.url || '/assets/icons/file-upload.svg'

            if (mimeType.includes('video/mp4')) {
              return (
                <CarouselItem key={fileId}>
                  <div className='p-1'>
                    <video
                      src={url}
                      className='post_details-img'
                      controls
                      loop
                    />
                  </div>
                </CarouselItem>
              )
            }

            return (
              <CarouselItem key={fileId}>
                <div className='p-1'>
                  <img
                    src={url}
                    alt='Post image'
                    loading='lazy'
                    className='post_details-img'
                  />
                </div>
              </CarouselItem>
            )
          })}
      </CarouselContent>
      <CarouselPrevious className='opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary-500' />
      <CarouselNext className='opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary-500' />
      <div className='flex-center py-2 gap-1'>
        {emblaApi?.scrollSnapList().map((snapPointPosition, index) => (
          <CircleIcon
            key={snapPointPosition}
            size={16}
            className={cn('cursor-pointer stroke-light-3', {
              'fill-light-3': index === current - 1
            })}
            onClick={handleDotClick(index)}
          />
        ))}
      </div>
    </Carousel>
  )
}

export default PostMediaCarousel
