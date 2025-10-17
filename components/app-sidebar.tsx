"use client"
import Image from "next/image";
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconLayoutKanban,
  IconListDetails,
  IconMessage,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar"
import { AudioWaveform, Command, GalleryVerticalEnd, SearchIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Logo } from "./logo";
import { ProjectSwitcher } from "./project-switcher";
import { ParamValue } from "next/dist/server/request/params";
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { MyCommandDialog } from "./command-dialog";

// Static data that does not depend on URL parameters can be defined here.
// We'll define everything here except the navMain URLs, which are dynamic.
const staticData = {
  user: {
    userId: "123",
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    role: "Project Manager",
  },
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  projects: [
    {
      name: "Mockup development",
      logo: GalleryVerticalEnd,
      roleInTheProject: "Project Manager",
    },
    {
      name: "Google redesign",
      logo: AudioWaveform,
      roleInTheProject: "Desingn Director",
    },
    {
      name: "Database migration",
      logo: Command,
      roleInTheProject: "Backend Developer",
    },
  ],
}

/**
 * Helper function to create the navMain items with dynamic URLs.
 * * NOTE: The userId is no longer used in the URL construction below.
 * @param {string} userId - The current user ID (still passed for completeness/future use).
 * @param {string} projectId - The current project ID from URL params.
 */
const getNavMain = (userId: ParamValue, projectId: ParamValue) => [
  {
    title: "Dashboard",
    // 💡 FIX: Removed the /${userId} segment.
    url: `/dashboard/${projectId}`,
    icon: IconDashboard,
  },
  {
    title: "Kanban",
    // 💡 FIX: Removed the /${userId} segment.
    url: `/kanban/${projectId}`,
    icon: IconLayoutKanban,
  },
  {
    title: "Messages",
    // 💡 FIX: Removed the /${userId} segment.
    url: `/messages/${projectId}`,
    icon: IconMessage,
  },
  {
    title: "Team",
    // 💡 FIX: Removed the /${userId} segment.
    url: `/team/${projectId}`,
    icon: IconUsers,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openSearch, setOpenSearch] = React.useState(false)
  const { state } = useSidebar() // 👈 Get sidebar collapsed/expanded state here
  const isCollapsed = state === "collapsed"

  const params = useParams()
  const projectId = (params.projectId as string) || "inventedID"
  const userId = params.userId
  const data = React.useMemo(
    () => ({
      ...staticData,
      navMain: getNavMain(userId, projectId),
    }),
    [userId, projectId]
  )

  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const day = date?.getDate()
  const month = date?.toLocaleString("en-US", { month: "short" })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <NavMain items={data.navMain} />
        <SidebarSeparator className="my-2 opacity-60 w-[calc(100%-1.5rem)] mx-auto" />

        {/* --- Calendar (full vs collapsed) --- */}
        <div className="flex flex-col items-center justify-center px-3 py-2">
          <AnimatePresence mode="wait" initial={false}>
            {!isCollapsed ? (
              // Expanded Calendar
              <motion.div
                key="expanded-calendar"
                initial={{ opacity: 0, scale: 0.95, height: 0 }}
                animate={{ opacity: 1, scale: 1, height: "auto" }}
                exit={{ opacity: 0, scale: 0.9, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  disabled={() => true}
                  className="rounded-lg border shadow-sm"
                  classNames={{
                    disabled:
                      "text-foreground opacity-100 cursor-default pointer-events-none",
                  }}
                />
              </motion.div>
            ) : (
              // Collapsed Compact Date Card
              <motion.div
                key="collapsed-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center w-12 h-12 rounded-lg border shadow-sm bg-muted/40"
              >
                <span className="text-lg font-semibold leading-none">{day}</span>
                <span className="text-[10px] font-medium uppercase tracking-wide">
                  {month}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuItem className="mt-4 list-none">
          <SidebarMenuButton
            tooltip="Search"
            className="flex items-center justify-between hover:cursor-pointer w-full"
            onClick={() => setOpenSearch(true)}
          >
            <div className="flex items-center gap-2">
              <SearchIcon className="w-[16px]" />
              <span className="text-sm">Search</span>
            </div>
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none">
              <span className="text-xs">⌘</span>K
            </kbd>
          </SidebarMenuButton>

          <MyCommandDialog
            open={openSearch}
            onOpenChange={setOpenSearch}
            items={data.navMain}
          />
        </SidebarMenuItem>

        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}