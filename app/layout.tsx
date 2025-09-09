import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth"
import { SessionMonitor } from "@/components/session-monitor"

export const metadata: Metadata = {
  title: "BankOS - Banking Operating System",
  description:
    "Unified banking platform for African financial institutions with fraud detection, KYC, loan processing, and analytics",
  generator: "BankOS",
  manifest: "/manifest.json",
  keywords: ["banking", "fintech", "fraud detection", "KYC", "loans", "analytics", "Africa"],
  authors: [{ name: "BankOS Team" }],
  creator: "BankOS",
  publisher: "BankOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bankos.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BankOS - Banking Operating System",
    description: "Unified banking platform for African financial institutions",
    url: "https://bankos.vercel.app",
    siteName: "BankOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BankOS - Banking Operating System",
    description: "Unified banking platform for African financial institutions",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BankOS",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="BankOS" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BankOS" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1e40af" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.jpg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <SessionMonitor />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
