

import { PricingCards } from '@/components/pricing-cards';
import { PricingFaq } from '@/components/pricing-faq';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';

export const metadata = {
  title: "Pricing",
}

export default async function PricingPage({ params }: {
  params: { locale: string; }
}) {
  const user = await auth()
  let subscriptionPlan;

  if (user) {
    subscriptionPlan = await getUserSubscriptionPlan(user.userId!, params.locale)
  }

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards locale={params.locale} userId={user?.userId!} subscriptionPlan={subscriptionPlan} />

      <hr className='container' />
    </div>
  )
}