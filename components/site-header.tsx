// app/(main-app)/components/site-header.tsx  (or wherever your component lives)
"use client"
import React from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname, useParams } from "next/navigation"

const routeTitles: Record<string, string> = {
  dashboard: "Dashboard",
  kanban: "Kanban",
  messages: "Messages",
  team: "Team",
}

export function SiteHeader(props: React.HTMLAttributes<HTMLElement>) {
  const { className, ...rest } = props

  const pathname = usePathname() || "/"
  // const params = useParams();

  const segments = pathname.split("/").filter(Boolean)
  const currentSection = segments[0] || "dashboard"
  const title = routeTitles[currentSection] || "couldn't get the title"

  return (
    <header
      {...rest}
      className={
        // base classes from your original header + any passed className
        `flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)] ${className ?? ""}`
      }
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}
