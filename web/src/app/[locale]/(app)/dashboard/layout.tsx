import { notFound } from "next/navigation"

import { DashboardNav } from "@/components/layout/nav"
import { NavBar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { dashboardConfigEn, dashboardConfigZh } from "@/config/dashboard"
import { auth } from "@clerk/nextjs"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

interface DashboardLayoutProps {
  children?: React.ReactNode,
  params: { locale: string };
  modal: any;
}

export default async function DashboardLayout({
  children, params
}: DashboardLayoutProps) {
  const user = await auth()
  if (!user) {
    return notFound()
  }
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={params.locale} messages={
        // … and provide the relevant messages
        messages
      }
    >
      <div className="flex min-h-screen flex-col space-y-6">

        <NavBar locale={params.locale} items={params.locale === "zh" ? dashboardConfigZh.mainNav : dashboardConfigEn.mainNav} scroll={false} />

        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={params.locale === "zh" ? dashboardConfigZh.sidebarNav : dashboardConfigEn.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <SiteFooter className="border-t" />
      </div>
    </NextIntlClientProvider>
  )
}
