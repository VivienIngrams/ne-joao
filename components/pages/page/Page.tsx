import { Footer } from '@/components/global/Footer'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {}

  return (
    <div>
      <div className="py-6 md:mx-28">
        {/* Header */}
        <Header title={title} description={overview} />

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-barlow max-w-3xl text-gray-800 text-xl"
            value={body}
          />
        )}

        {/* Footer - only display if the title is "Infos" */}
        {title === 'Infos' && (
          <footer className="md:fixed bottom-0 right-0 md:left-0 z-50 md:w-[200px] md:h-[30px] p-2 text-right md:text-left">
            <p className="text-gray-600 md:text-sm">
              Website by Vivien Ingrams
            </p>
          </footer>
        )}
      </div>
    </div>
  )
}

export default Page
