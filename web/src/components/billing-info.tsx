"use client"

import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, formatDate } from "@/lib/utils"
import Link from "next/link"
import { UserSubscriptionPlan } from "@/types"
import { useTranslations } from 'next-intl';

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({
  subscriptionPlan
}: BillingInfoProps) {
  const t = useTranslations()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("subscription")}</CardTitle>
        <CardDescription>
          {t("planBefore")} <strong>{subscriptionPlan.title}</strong>{" "}
          {t("planAfter")}.
        </CardDescription>
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <Link
          href="/pricing"
          className={cn(buttonVariants())}
        >
          {subscriptionPlan.isPaid ? t("managePlan") : t("upgradePlan")}
        </Link>

        {subscriptionPlan.isPaid ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled
              ? t("planCancel")
              : t("planRenew")}
            {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  )
}
