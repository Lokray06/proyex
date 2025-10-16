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
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    /*
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
    */
  ],
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
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
        <ProjectSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
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
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}