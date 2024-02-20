import { DashboardConfig } from "@/types"

export const dashboardConfigEn: DashboardConfig = {
  mainNav: [
    {
      title: "App",
      href: "https://app.chatlog.ai",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Usage",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}


export const dashboardConfigZh: DashboardConfig = {
  mainNav: [
    {
      title: "App",
      href: "https://app.chatlog.ai",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "使用量",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "账单",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "设置",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
