import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/layout/mode-toggle"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl"

export function LoginButton({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations()

  return (
    <Link
      href="/login"
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" })
      )}
    >
      {t('signIn')}
    </Link>
  )
}
