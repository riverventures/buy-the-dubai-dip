import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Buy the Dubai Dip | UAE Equities at a Discount',
  description: 'UAE equities are trading at historic discounts. Track drawdowns, compare to COVID recovery, and get early access to tokenized UAE equity exposure on Solana.',
  keywords: ['UAE equities', 'Dubai stocks', 'DFM', 'ADX', 'Solana', 'tokenized assets', 'RWA', 'real world assets'],
  openGraph: {
    title: 'Buy the Dubai Dip',
    description: 'UAE equities at historic discounts. Track the drawdown. Buy the recovery.',
    type: 'website',
    url: 'https://dubaidip.xyz',
    siteName: 'Buy the Dubai Dip',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy the Dubai Dip',
    description: 'UAE equities at historic discounts. Track the drawdown. Buy the recovery.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
