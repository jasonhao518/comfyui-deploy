import { headers } from "next/headers"
import Stripe from "stripe"

import { env } from "@/env.mjs"
import { db } from "@/db/db"
import { stripe } from "@/lib/stripe"
import { quotaTable, usersTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.

    await db.update(usersTable)
      .set({
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        )
      })
      .where(eq(usersTable.id, session?.metadata?.userId!))
      .returning({ updatedId: usersTable.id });

    let credit = 0
    let rate = 0
    let gpt4 = false
    let gemini = false
    let dalle = false
    let beta = false
    let plan = "free"
    const priceId = subscription.items.data[0].price.id
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID || priceId === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID) {
      credit = 19000
      rate = 3000
      gpt4 = true
      gemini = true
      dalle = true
      beta = true
      plan = "pro"
    } else {
      plan = "basic"
      credit = 9000
      rate = 1000
      gpt4 = true
      gemini = true
      dalle = true
      beta = true
    }


    await db.insert(quotaTable)
      .values({
        id: session?.metadata?.userId!,
        plan,
        credit,
        rate,
        gpt4,
        dalle,
        gemini,
        beta,
        stripe_current_period_end: new Date(
          subscription.current_period_end * 1000
        )
      })
      .onConflictDoUpdate({
        target: quotaTable.id,
        set: {
          plan,
          credit,
          rate,
          gpt4,
          dalle,
          gemini,
          beta,
          stripe_current_period_end: new Date(
            subscription.current_period_end * 1000
          )
        },
      });

  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // Update the price id and set the new period end.

    const updatedUserId: { updatedId: string }[] = await db.update(usersTable)
      .set({
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        )
      })
      .where(eq(usersTable.stripeSubscriptionId, subscription.id))
      .returning({ updatedId: usersTable.id });

    let credit = 0
    let rate = 0
    let gpt4 = false
    let gemini = false
    let dalle = false
    let beta = false
    let plan = "free"
    const priceId = subscription.items.data[0].price.id
    if (priceId === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID || priceId === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID) {
      credit = 19000
      rate = 3000
      gpt4 = true
      gemini = true
      dalle = true
      beta = true
      plan = "pro"
    } else {
      plan = "basic"
      credit = 9000
      rate = 1000
      gpt4 = true
      gemini = true
      dalle = true
      beta = true
    }


    await db.insert(quotaTable)
      .values({
        id: updatedUserId[0].updatedId,
        plan,
        credit,
        rate,
        gpt4,
        dalle,
        gemini,
        beta,
        stripe_current_period_end: new Date(
          subscription.current_period_end * 1000
        )
      })
      .onConflictDoUpdate({
        target: quotaTable.id,
        set: {
          plan,
          credit,
          rate,
          gpt4,
          dalle,
          gemini,
          beta,
          stripe_current_period_end: new Date(
            subscription.current_period_end * 1000
          )
        },
      });


  }

  return new Response(null, { status: 200 })
}
