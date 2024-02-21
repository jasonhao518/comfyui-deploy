import { redirect } from "next/navigation"

import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { UserNameForm } from "@/components/forms/user-name-form"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { getTranslations } from "next-intl/server"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage({ params }: { params: { locale: string } }) {
  const user = await auth()
  const t = await getTranslations()
  if (!user) {
    redirectToSignIn()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("settings")}
        text={t("settingsDesc")}
      />
      <div className="grid gap-10">

      </div>
    </DashboardShell>
  )
}
