import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/app/_providers/query-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | OneLog",
    default: "OneLog",
  },
  description: "하루 한 문장씩 - 당신의 감정을 기록하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <QueryProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
