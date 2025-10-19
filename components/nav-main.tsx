"use client"
import { usePathname } from "next/navigation"
import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { QuickCreate } from "./quick-create"

export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon?: Icon }[]
}) {
  const pathname = usePathname() // e.g., "/123/dashboard/456"

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <QuickCreate />
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`
                      hover:cursor-pointer
                      flex items-center gap-2
                      ${isActive ? "font-bold bg-muted text-secondary-foreground hover:text-secondary-foreground hover:bg-primary/10" : ""}
                      hover:bg-muted/30 hover:text-foreground
                      duration-200 ease-linear
                    `}
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
