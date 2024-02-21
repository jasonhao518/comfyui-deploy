"use client";

import useScroll from "@/hooks/use-scroll";
import { MainNavItem } from "@/types";
import { MainNav } from "./main-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { LoginButton } from "./login-button";
import { useMediaQuery } from "usehooks-ts";

import {
  OrganizationList,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  useOrganization,
} from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { useRouter } from "next/navigation";

interface NavBarProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  rightElements?: React.ReactNode
  scroll?: boolean
  locale: string
  dashboard?: boolean
}

export function NavBar({ locale, items, children, rightElements, scroll = false, dashboard = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const signInModal = useSigninModal();
  const t = useTranslations()
  const router = useRouter()
  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${scroll ? scrolled
        ? "border-b"
        : "bg-background/0"
        : "border-b"}`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav dashboard={dashboard} items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}
          <LocaleSwitcher />
          <SignedIn>
            {dashboard && <UserButton />}
            {!dashboard && <Button onClick={() => router.push("/dashboard")} >{t("dashboard")}</Button>}
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>

        </div>
      </div>
    </header>
  );
}