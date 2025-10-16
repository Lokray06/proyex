"use client"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname, useParams } from "next/navigation"

const routeTitles: Record<string, string> = {
  dashboard: "Dashboard",
  kanban: "Kanban",
  messages: "Messages",
  team: "Team",
};


export function SiteHeader() {
  const pathname = usePathname();       // e.g., "/123/dashboard/456"
  const params = useParams();           // { userId: "123", projectId: "456" }

  // Extract the second segment (dashboard/kanban/etc.)
  const segments = pathname.split("/").filter(Boolean);
  const currentSection = segments[0] || "Error retrieving the section from the URL"; // fallback

  const title = routeTitles[currentSection] || "couldnt get teh title";

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}

