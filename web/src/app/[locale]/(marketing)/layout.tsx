
import { NavBar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { marketingConfigEn, marketingConfigFr } from "@/config/marketing"
import { auth } from "@clerk/nextjs"
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages } from "next-intl/server";

import { Suspense } from "react"

interface MarketingLayoutProps {
  children: React.ReactNode,
  params: { locale: string };
}

export default async function MarketingLayout({
  children,
  params
}: MarketingLayoutProps) {
  const user = await auth()
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={params.locale} messages={
        // … and provide the relevant messages
        messages
      }
    >
      <div className="flex min-h-screen flex-col">
        <Suspense fallback="...">
          <NavBar locale={params.locale} items={params.locale === "en" ? marketingConfigEn.mainNav : marketingConfigFr.mainNav} scroll={true} />

        </Suspense>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  )
}
