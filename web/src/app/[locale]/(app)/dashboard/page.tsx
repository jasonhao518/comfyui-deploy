import { redirect } from "next/navigation"

import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import Charts from "@/components/Charts"
import Link from "next/link"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { getMessages, getTranslations } from "next-intl/server"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await auth()
  const t = await getTranslations();
  if (!user) {
    redirectToSignIn()

  }
  const quota = { beta: true };
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0)
  sevenDaysAgo.setMinutes(0)
  sevenDaysAgo.setSeconds(0)
  const result = [] as any


  return (
    <DashboardShell>
      <DashboardHeader heading={t("usage")} text={t("usageDesc")}>
        {quota?.beta && <Link href="https://beta.chatlog.ai?_vercel_share=HMbej3IvCuJmqFXXnoMe1egTRXoDLciJ" >{t("exploreBeta")}</Link>
        }
      </DashboardHeader>
      <div>
        <Charts quota={quota} data={result} />
      </div>
    </DashboardShell>
  )
}
