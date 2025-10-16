"use client"
import Image from "next/image";
import Link from "next/link"
import { useParams } from "next/navigation"
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
} from "@/components/ui/sidebar"
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
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
  const params = useParams();

  // Keep the project ID fallback to avoid "undefined" in the URL
  const projectId = (params.projectId as string) || 'inventedID';

  // You can now remove the 'userId' logic entirely, or simplify it:
  const userId = params.userId; // Not used for link construction now

  // Use React.useMemo...
  const data = React.useMemo(() => ({
    ...staticData,
    // Pass userId and projectId to the helper
    navMain: getNavMain(userId, projectId),
  }), [userId, projectId]);


  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        </SidebarContent>
        <SidebarFooter>
        <Calendar
          mode="single"
          selected={date}
          disabled={() => true} // disables date clicks, keeps nav active
          className="rounded-lg border"
          classNames={{
            disabled:
              // restore normal text color and full opacity; make it look active but still not clickable
              "text-foreground opacity-100 cursor-default pointer-events-none",
          }}
        />
        <MyCommandDialog className="justify-end"></MyCommandDialog>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}