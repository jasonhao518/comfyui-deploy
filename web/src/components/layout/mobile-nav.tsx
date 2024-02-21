import * as React from "react"
import Link from "next/link"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"
import { Icons } from "@/components/shared/icons"
import { Github, Menu } from "lucide-react";

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

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { OrganizationList, useOrganization } from "@clerk/nextjs"
import { NavbarMenu } from "@/components/NavbarMenu"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
  dashboard?: boolean
}

export function MobileNav({ items, children, dashboard = false }: MobileNavProps) {
  useLockBody()
  const { organization } = useOrganization();
  const _isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isDesktop, setIsDesktop] = useState(true);
  const [isSheetOpen, setSheetOpen] = useState(true);
  useEffect(() => {
    setIsDesktop(_isDesktop);
  }, [_isDesktop]);
  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Sheet open={isSheetOpen} onOpenChange={(open) => setSheetOpen(open)}>

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
        {children}
      </div>
    </div>
  )
}
