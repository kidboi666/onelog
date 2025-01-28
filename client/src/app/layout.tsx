import type { Metadata } from 'next'
import { ReactNode } from 'react'
import ReactQueryProvider from '@/src/store/providers/query-client-provider'
import ThemeProvider from '@/src/store/providers/theme-provider'
import { ErrorBoundary } from '@/src/components/ErrorBoundary'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | OneSentence',
    default: 'OneSentence',
  },
  description: '하루 한 문장씩 - 당신의 감정을 기록하세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <ThemeProvider>
        <body className="hidden bg-var-lightgray transition dark:bg-var-dark">
          <ErrorBoundary>
            <ReactQueryProvider>
              {children}
              <div id="portal" />
            </ReactQueryProvider>
          </ErrorBoundary>
        </body>
      </ThemeProvider>
    </html>
  )
}
