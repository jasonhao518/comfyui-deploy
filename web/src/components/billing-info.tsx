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
          {t("plan.before")} <strong>{subscriptionPlan.title}</strong>{" "}
          {t("plan.after")}.
        </CardDescription>
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <Link
          href="/pricing"
          className={cn(buttonVariants())}
        >
          {subscriptionPlan.isPaid ? t("manage.plan") : t("upgrade.plan")}
        </Link>

        {subscriptionPlan.isPaid ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled
              ? t("plan.cancel")
              : t("plan.renew")}
            {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  )
}
