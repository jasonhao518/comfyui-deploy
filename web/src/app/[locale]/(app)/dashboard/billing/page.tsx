import { redirect } from "next/navigation"

import { getUserSubscriptionPlan } from "@/lib/subscription"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BillingInfo } from "@/components/billing-info"
import { DashboardHeader } from "@/components/dashboard/header"
import { Icons } from "@/components/shared/icons"
import { DashboardShell } from "@/components/dashboard/shell"

import { auth, redirectToSignIn } from "@clerk/nextjs"
import { getTranslations } from "next-intl/server"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}

export default async function BillingPage({ params }: {
  params: { locale: string }
}) {
  const user = await auth()
  const t = await getTranslations()

  if (!user) {
    redirectToSignIn()
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user?.userId!, params.locale)

  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("billing")}
        text={t("billingDesc")}
      />
      <div className="grid gap-8">
        <BillingInfo
          subscriptionPlan={subscriptionPlan}
        />
      </div>
    </DashboardShell>
  )
}
