import Image from 'next/image'
import { urlForImage, getObjectPositionFromHotspot } from '@/sanity/lib/utils'

// Extend the Sanity Image type to ensure compatibility with the expected Image_2
interface SanityImage extends Image {
  asset?: any
  hotspot?: ImageHotspot
}

interface ImageBoxProps {
  image?: SanityImage
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  'data-sanity'?: string
}

// Default handling for ImageHotspot, if width or height are undefined
const imageHotspotWithDefaults = (hotspot?: ImageHotspot) => ({
  x: hotspot?.x || 0.5,  // Default to 0.5 if undefined
  y: hotspot?.y || 0.5,  // Default to 0.5 if undefined
  width: hotspot?.width ?? 100,  // Default to 100 if undefined
  height: hotspot?.height ?? 100, // Default to 100 if undefined
});

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper,
  ...props
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url()

  // Ensure hotspot compatibility with defaults
  const hotspot = image?.hotspot ? imageHotspotWithDefaults(image.hotspot) : { x: 0.5, y: 0.5, width: 100, height: 100 };
  const objectPosition = getObjectPositionFromHotspot(hotspot)

  return (
    <div
      className={`w-full overflow-hidden ${classesWrapper}`}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        <Image
          className="absolute object-cover h-full w-full  border-2 md:border-[3px] border-[#264653]"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          priority
          style={{
            objectPosition, // Apply hotspot-based position
          }}
        />
      )}
    </div>
  )
}
