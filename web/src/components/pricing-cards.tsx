"use client";

import Link from "next/link";
import { Suspense, useState } from 'react';

import { BillingFormButton } from "@/components/forms/billing-form-button";
import { Icons } from "@/components/shared/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from '@/components/ui/switch';
import { pricingDataEn, pricingDataZh } from "@/config/subscriptions";
import { UserSubscriptionPlan } from "@/types";
import { useTranslations } from "next-intl";
import { redirectToSignIn } from "@clerk/nextjs";

interface PricingCardsProps {
  userId?: string;
  locale: string
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, locale, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault = (!subscriptionPlan?.interval || subscriptionPlan.interval === "year") ? true : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const pricingData = locale === "zh" ? pricingDataZh : pricingDataEn
  const t = useTranslations()
  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section className="container flex flex-col items-center text-center">
      <div className="mx-auto mb-10 flex w-full flex-col gap-5">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{t("pricing")}</p>
        <h2 className="font-heading text-xl leading-[1.1] md:text-3xl">
          {t("pricing.slogan")}
        </h2>
      </div>

      <div className="mb-4 flex items-center gap-5">
        <span>{t("monthly.bill")}</span>
        <Switch
          checked={isYearly}
          onCheckedChange={toggleBilling}
          role="switch"
          aria-label="switch-year"
        />
        <span><span>{t("annual.bill")}</span></span>
      </div>

      <div className="mx-auto grid max-w-screen-lg gap-5 bg-inherit py-5 md:grid-cols-3 lg:grid-cols-3">
        {pricingData.map((offer) => (
          <div className="relative flex flex-col overflow-hidden rounded-xl border" key={offer.title}>
            <div className="min-h-[150px] items-start space-y-4 bg-secondary/70 p-6">
              <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {offer.title}
              </p>

              <div className="flex flex-row">
                <div className="flex items-end">
                  <div className="flex text-left text-3xl font-semibold leading-6">
                    {isYearly && offer.prices.monthly > 0 ? (
                      <>
                        <span className="mr-2 text-muted-foreground line-through">${offer.prices.monthly}</span>
                        <span>${(offer.prices.yearly / 12).toFixed(2)}</span>
                      </>
                    ) : `$${offer.prices.monthly}`}
                  </div>
                  <div className="-mb-1 ml-2 text-left text-sm font-medium">
                    <div>/{t("month")}</div>
                  </div>
                </div>
              </div>
              {offer.prices.monthly > 0 ? (
                <div className="text-left text-sm text-muted-foreground">
                  {isYearly ? `$${offer.prices.yearly} ${t("charge.annual")}` : `${t("charge.monthly")}`}
                </div>
              ) : null}
            </div>

            <div className="flex h-full flex-col justify-between gap-16 p-6">
              <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                {offer.benefits.map((feature) => (
                  <li className="flex items-start" key={feature}>
                    <Icons.check className="mr-3 size-5 shrink-0" />
                    <p>{feature}</p>
                  </li>
                ))}

                {offer.limitations.length > 0 && offer.limitations.map((feature) => (
                  <li className="flex items-start text-muted-foreground" key={feature}>
                    <Icons.close className="mr-3 size-5 shrink-0" />
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>

              {userId && subscriptionPlan ? (
                offer.title === 'Starter' ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      className: 'w-full',
                      variant: 'default',
                    })}
                  >
                    {t("go.dashboard")}
                  </Link>
                ) : (
                  <BillingFormButton locale={locale} year={isYearly} offer={offer} subscriptionPlan={subscriptionPlan} />
                )
              ) : (
                <Button onClick={() => redirectToSignIn({ returnBackUrl: "/pricing" })}>{t("signIn")}</Button>
              )}

            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-balance text-center text-base text-muted-foreground">
        <strong>{t("pricing.reference")} <a target="_blank" href="https://openai.com/pricing">OpenAI Pricing</a></strong>
      </p>
    </section>
  )
}
