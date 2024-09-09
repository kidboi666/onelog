import type { Metadata } from 'next'
import ReactQueryProvider from '@/lib/tanstack/query-client-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'One Sentence',
  description: '하루 한 문장씩 - 홍보 문구 - ',
}

export default function RootLayout({
  children,
  background,
}: Readonly<{
  children: React.ReactNode
  background: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="hidden">
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {background}
        <div id="portal" />
      </body>
    </html>
  )
}
