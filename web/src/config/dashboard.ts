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
      title: "Workflows",
      href: "/dashboard/workflows",
      icon: "billing",
    },
    {
      title: "Machines",
      href: "/dashboard/machines",
      icon: "billing",
    },
    {
      title: "API Keys",
      href: "/dashboard/api-keys",
      icon: "billing",
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
      title: "Examples",
      href: "/examples",
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
      title: "工作流",
      href: "/dashboard/workflows",
      icon: "billing",
    },
    {
      title: "机器",
      href: "/dashboard/machines",
      icon: "billing",
    },
    {
      title: "API密钥",
      href: "/dashboard/api-keys",
      icon: "billing",
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
