"use client"

import { generateUserStripe } from '@/actions/generate-user-stripe'
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types"
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  year: boolean;
  locale: string;
}

export function BillingFormButton({ year, offer, subscriptionPlan, locale }: BillingFormButtonProps) {
  let [isPending, startTransition] = useTransition();
  const t = useTranslations()
  const generateUserStripeSession = generateUserStripe.bind(
    null,
    offer.stripeIds[year ? "yearly" : "monthly"]!
  );

  const stripeSessionAction = () => startTransition(async () => await generateUserStripeSession(offer.stripeIds[year ? "yearly" : "monthly"]!));

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        <>
          {subscriptionPlan.stripePriceId === offer.stripeIds[year ? "yearly" : "monthly"]
            ? t("managePlan")
            : t("upgradePlan")}
        </>
      )}
    </Button>
  )
}
