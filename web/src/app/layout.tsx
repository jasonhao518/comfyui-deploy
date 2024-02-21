import "@/styles/globals.css";
import { shadesOfPurple, dark } from "@clerk/themes";
import { fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { Analytics } from "@/components/analytics";
import { ModalProvider } from "@/components/modal-provider";
import { ThemeProvider } from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { ClerkProvider } from '@clerk/nextjs'
import { GoogleAnalytics } from '@next/third-parties/google'
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Prisma",
    "PlanetScale",
    "Auth.js",
    "shadcn ui",
    "Resend",
    "React Email",
    "Stripe"
  ],
  authors: [
    {
      name: "mickasmt",
    },
  ],
  creator: "mickasmt",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@miickasmt",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { theme, setTheme } = useTheme();
  return (
    <ClerkProvider appearance={{
      baseTheme: theme == "dark" ? dark : shadesOfPurple,
    }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontUrban.variable,
            fontHeading.variable
          )}
        >
          <GoogleAnalytics gaId="AW-628046278" />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Analytics />
            <Toaster />
            <ModalProvider />
            <TailwindIndicator />
          </ThemeProvider>
          <Script id="my-script">{`window.$crisp=[];window.CRISP_WEBSITE_ID="48739dc7-7b9f-43ff-b6eb-cd9bc672ce88";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}</Script>

        </body>
      </html>
    </ClerkProvider>
  )
}
