import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { dataset, projectId } from '@/sanity/lib/api'

// Ensuring ImageHotspot interface defines width and height as required
interface ImageHotspot {
  x: number
  y: number
  width: number  // Make width required
  height: number // Make height required
}

export function getObjectPositionFromHotspot(hotspot: ImageHotspot) {
  const { x = 0.5, y = 0.5 } = hotspot || {}
  return `${x * 100}% ${y * 100}%`
}

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function urlForOpenGraphImage(image: Image | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url()
}

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'projects':
      return '/projects'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'project':
      return slug ? `/projects/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

const imageHotspotWithDefaults = (hotspot?: ImageHotspot) => ({
  x: hotspot?.x || 0.5,  // Default to 0.5 if undefined
  y: hotspot?.y || 0.5,  // Default to 0.5 if undefined
  width: hotspot?.width ?? 100,  // Default to 100 if undefined
  height: hotspot?.height ?? 100, // Default to 100 if undefined
});
