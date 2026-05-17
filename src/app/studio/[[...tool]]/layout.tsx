import { metadata as sanityMetadata, viewport as sanityViewport } from 'next-sanity/studio'

// تصدير الإعدادات بشكل صريح ليتعرف عليها Next.js
export const metadata = sanityMetadata
export const viewport = sanityViewport

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  )
}