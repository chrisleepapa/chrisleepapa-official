export const metadata = {
  title: 'Chris Lee.Papa - Creative Archive',
  description: '크리에이티브 아카이브',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
