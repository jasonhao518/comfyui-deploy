"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SignedIn } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { NavbarMenu } from "@/components/NavbarMenu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  OrganizationList,
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { Github, Menu } from "lucide-react";
import meta from "next-gen/config";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  dashboard?: boolean
}



export function MainNav({ items, children, dashboard = false }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const t = useTranslations()
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }
  const { organization } = useOrganization();
  const _isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isDesktop, setIsDesktop] = useState(true);
  const [isSheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    setIsDesktop(_isDesktop);
  }, [_isDesktop]);
  React.useEffect(() => {
    const closeMobileMenuOnClickOutside = (event: MouseEvent) => {
      if (showMobileMenu) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener("click", closeMobileMenuOnClickOutside)

    return () => {
      document.removeEventListener("click", closeMobileMenuOnClickOutside)
    }
  }, [showMobileMenu])

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-urban text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <SignedIn>
        {dashboard && <div className="hidden gap-6 md:flex"><OrganizationSwitcher /></div>}

      </SignedIn>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      {!isDesktop && (
        <Sheet open={isSheetOpen} onOpenChange={(open) => setSheetOpen(open)}>
          <SheetTrigger asChild>
            <button className="flex items-center justify-center w-8 h-8 p-2">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-4">
            <SheetHeader>
              <SheetTitle className="text-start">Comfy Deploy</SheetTitle>
            </SheetHeader>
            <div className="grid h-full grid-rows-[1fr_auto]">
              <NavbarMenu
                className=" h-full"
                closeSheet={() => setSheetOpen(false)}
              />
              {/* <OrganizationSwitcher
                  appearance={{
                    elements: {
                      rootBox: "flex items-center justify-center  z-[50]",
                    },
                  }}
                /> */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    Organization
                    {organization?.name && ` (${organization?.name})`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 border-0 bg-none shadow-none">
                  <OrganizationList />
                </PopoverContent>
              </Popover>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
