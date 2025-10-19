// app/(main-app)/layout.tsx
import { AppSidebar } from "@/components/app-sidebar"
import { MyCommandDialog } from "@/components/command-dialog"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Proyex",
    description: "Manage your projects smarter",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />

            {/* Ensure the inset takes the full height and a fixed width, doesn't scroll */}
            <SidebarInset className="flex flex-col h-[98vh] overflow-hidden">
                {/* wrapper to control layout and scrolling */}
                <SiteHeader /> {/* stays fixed */}

                {/* content scrolls */}
                <main className="flex-1 overflow-auto no-scrollbar">
                    <div className="@container/main flex flex-col gap-2 min-h-full h-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
