import { env } from "@/env.mjs";
import { SiteConfig } from "@/types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Chatlog App",
  description:
    "Easy to use ChatGPT Next Web hosting",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web",
  },
  mailSupport: "support@saas-starter.com"
}
