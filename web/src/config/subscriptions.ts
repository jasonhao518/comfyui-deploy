import { SubscriptionPlan } from "@/types"
import { env } from "@/env.mjs"

export const pricingDataEn: SubscriptionPlan[] = [
  {
    title: 'Free',
    description: 'For free trial',
    benefits: [
      '$1 credit',
      'Up to 100 message per day',
      'Chat with PDF',
      'Access to GPT 3.5',
      'Access to Gemini Pro',
      'Access to Gemini Pro Vision',
      'Access to Stable Diffusion',
    ],
    limitations: [
      'No access to GPT 4',
      'No access to GPT Vision',
      'No access to DALL.E 3',
      'No access to Midjourney',
      'No access to Beta features',
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: 'Basic',
    description: 'Enjoy more AI chat',
    benefits: [
      '$9 credit per month',
      'Up to 1000 message per day',
      'Chat with PDF',
      'Access to GPT 3.5',
      'Access to Gemini Pro',
      'Access to Gemini Pro Vision',
      'Access to Stable Diffusion',
      'Access to GPT 4',
      'Access to GPT Vision',
      'Access to DALL.E 3',
      'Access to Midjourney',
      'Access to Beta features',
    ],
    limitations: [

    ],
    prices: {
      monthly: 9.99,
      yearly: 99.99,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: 'Professional',
    description: 'Unlock more advanced features',
    benefits: [
      '$19 credit per month',
      'Up to 3000 message per day',
      'Chat with PDF',
      'Access to GPT 3.5',
      'Access to Gemini Pro',
      'Access to Gemini Pro Vision',
      'Access to Stable Diffusion',
      'Access to GPT 4',
      'Access to GPT Vision',
      'Access to DALL.E 3',
      'Access to Midjourney',
      'Access to Beta features',
    ],
    limitations: [],
    prices: {
      monthly: 19.99,
      yearly: 199.99,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];


export const pricingDataZh: SubscriptionPlan[] = [
  {
    title: '免费版',
    description: '免费试用',
    benefits: [
      '1美元 额度',
      '每天限额100条消息',
      'PDF文件聊天',
      '可以使用GPT3.5模型',
      '可以使用Gemini Pro模型',
      '可以使用Gemini Pro Vision模型',
      '可以使用Stable Diffusion模型',
    ],
    limitations: [
      '不可以使用GPT4模型',
      '不可以使用GPT4 Vision模型',
      '不可以使用DALL.E 3模型',
      '不可以使用Midjourney模型',
      '不可以使用最新试用功能',
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: '基本版',
    description: '畅享AI聊天',
    benefits: [
      '9美元额度',
      '每天限额1000条消息',
      'PDF文件聊天',
      '可以使用GPT3.5模型',
      '可以使用Gemini Pro模型',
      '可以使用Gemini Pro Vision模型',
      '可以使用Stable Diffusion模型',
      '可以使用GPT4模型',
      '可以使用GPT4 Vision模型',
      '可以使用DALL.E 3模型',
      '可以使用Midjourney模型',
      '可以使用最新试用功能',
    ],
    limitations: [

    ],
    prices: {
      monthly: 9.99,
      yearly: 99.99,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: '专业版',
    description: '解锁更多功能',
    benefits: [
      '19美元额度',
      '每天限额3000条消息',
      'PDF文件聊天',
      '可以使用GPT3.5模型',
      '可以使用Gemini Pro模型',
      '可以使用Gemini Pro Vision模型',
      '可以使用Stable Diffusion模型',
      '可以使用GPT4模型',
      '可以使用GPT4 Vision模型',
      '可以使用DALL.E 3模型',
      '可以使用Midjourney模型',
      '可以使用最新试用功能',
    ],
    limitations: [],
    prices: {
      monthly: 19.99,
      yearly: 199.99,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];
