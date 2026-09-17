import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { type FileModelWithUrl } from '@/types'
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
        {files?.map(({ $id, url, mimeType }) =>
          mimeType.includes('image')
            ? (
            <CarouselItem key={$id}>
              <div className='p-1'>
                <img
                  src={url ?? '/assets/icons/profile-placeholder.svg'}
                  alt='Post image'
                  loading='lazy'
                  className='post_details-img'
                />
              </div>
            </CarouselItem>
              )
            : (
            <CarouselItem key={$id}>
              <div className='p-1'>
                <video src={url} className='post_details-img' controls loop/>
              </div>
            </CarouselItem>
              )
        )}
      </CarouselContent>
      <CarouselPrevious className='opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary-500' />
      <CarouselNext className='opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary-500' />
      <div className='flex-center py-2 gap-1'>
        {emblaApi?.scrollSnapList().map((snapPointPosition, index) => (
          <CircleIcon
            key={snapPointPosition}
            size={16}
            className={cn('cursor-pointer opacity-50', {
              'fill-primary-500': index === current - 1
            })}
            onClick={handleDotClick(index)}
          />
        ))}
      </div>
    </Carousel>
  )
}

export default PostsCarousel
