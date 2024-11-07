import type { Metadata } from 'next'
import './globals.css'
import ReactQueryProvider from '@/store/context/query-client-provider'
import ThemeProvider from '@/store/context/theme-provider'
import Portal from '@/components/shared/Portal'

export const metadata: Metadata = {
  title: {
    template: '%s | OneSentence',
    default: 'OneSentence',
  },
  description: '하루 한 문장씩 - 당신의 감정을 기록하세요.',
}

export default function RootLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode
  modals: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <ThemeProvider>
        <body className="hidden bg-var-lightgray transition dark:bg-var-dark">
          <ReactQueryProvider>
            {children}
            <div id="portal" />
            <Portal>{modals}</Portal>
          </ReactQueryProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
