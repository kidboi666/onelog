import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReactQueryProvider from '@/providers/query-client-provider'
import Header from '@/components/header/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'One Sentence',
  description: '하루 한 문장씩 - 홍보 문구 - ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Header />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
