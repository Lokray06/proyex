import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import data from "./data.json"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyex - Project name",
  description: "Manage your projects smarter",
};

export default function ProjectDashboardPage({
  params,
}: {
  params: { projectId: string }
}) {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  )
}
