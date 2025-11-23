import { type FileModelWithUrl } from '@/types'
import { cn } from '@/utils/cn'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@shadcn/carousel'
import { CircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const PostsCarousel = ({
  files,
  className = ''
}: {
  files: FileModelWithUrl[]
  className?: string
}) => {
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
  }, [emblaApi, files])

  return (
    <Carousel setApi={setEmblaApi} className={cn('group', className)}>
      <CarouselContent>
        {files.length === 0 && (
          <CarouselItem>
            <div className='p-1'>
              <img
                src={'/assets/icons/file-upload.svg'}
                alt='Post image'
                loading='lazy'
                className='post_details-img'
              />
            </div>
          </CarouselItem>
        )}
        {files.length > 0 &&
          files.map(({ $id, url, mimeType }) => {
            if (mimeType.includes('image')) {
              return (
                <CarouselItem key={$id}>
                  <div className='p-1'>
                    <img
                      src={url ?? '/assets/icons/file-upload.svg'}
                      alt='Post image'
                      loading='lazy'
                      className='post_details-img'
                    />
                  </div>
                </CarouselItem>
              )
            }

            if (mimeType.includes('video/mp4')) {
              return (
                <CarouselItem key={$id}>
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

export default PostsCarousel
