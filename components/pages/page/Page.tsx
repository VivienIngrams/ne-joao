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
      <div className="mt-6 py-6 md:mx-28">
        {/* Header */}
        <Header title={title} description={overview} />

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-barlow max-w-3xl text-gray-200 text-xl"
            value={body}
          />
        )}

        {/* Footer */}
        {/* <Footer/> */}
      </div>
    </div>
  )
}

export default Page
