"use client"

import * as React from "react"
import { IconClock, IconAlertTriangle, IconCheck } from "@tabler/icons-react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Pie, PieChart, Label } from "recharts"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "./ui/progress"

// === Chart Data & Config ===
const chartData = [
  { name: "Completed", value: 140, fill: "var(--chart-2)" }, // green tone
  { name: "Pending", value: 96, fill: "var(--primary)" }, // primary
  { name: "Blocked", value: 12, fill: "var(--destructive)" }, // red tone
]

const chartConfig = {
  completed: { label: "Completed" },
  pending: { label: "Pending" },
  blocked: { label: "Blocked" },
} satisfies ChartConfig

// sample users data — in real app replace with API data
const usersData = [
  { name: "Alice Ramos", completed: 48, blocked: 2, pending: 12 },
  { name: "Ben Turner", completed: 36, blocked: 4, pending: 28 },
  { name: "Carla Nguyen", completed: 28, blocked: 3, pending: 18 },
  { name: "Diego Silva", completed: 28, blocked: 3, pending: 38 },
  { name: "Elena Vasquez", completed: 22, blocked: 1, pending: 14 },
  { name: "Faisal Khan", completed: 30, blocked: 2, pending: 10 },
  { name: "Greta Meyer", completed: 18, blocked: 0, pending: 8 },
  { name: "Hiro Tanaka", completed: 40, blocked: 5, pending: 6 },
  { name: "Igor Petrov", completed: 12, blocked: 6, pending: 20 },
  { name: "Jasmine Lee", completed: 34, blocked: 1, pending: 9 },
  { name: "Kevin O'Connor", completed: 26, blocked: 2, pending: 16 },
  { name: "Lucia Moretti", completed: 20, blocked: 0, pending: 22 },
  { name: "Miguel Ortega", completed: 44, blocked: 3, pending: 4 },
  { name: "Nora Patel", completed: 16, blocked: 2, pending: 12 },
  { name: "Omar Haddad", completed: 14, blocked: 1, pending: 18 },
  { name: "Priya Sharma", completed: 38, blocked: 0, pending: 5 },
  { name: "Quentin Blake", completed: 10, blocked: 4, pending: 26 },
  { name: "Rosa Alvarez", completed: 24, blocked: 2, pending: 14 },
  { name: "Samir Gupta", completed: 32, blocked: 3, pending: 11 },
]

// === Main Component ===
export function SectionCards() {
  const totalTasks = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    []
  )

  const completed = chartData.find((d) => d.name === "Completed")?.value ?? 0
  const pending = chartData.find((d) => d.name === "Pending")?.value ?? 0
  const blocked = chartData.find((d) => d.name === "Blocked")?.value ?? 0

  // New summary behaviour requested by user
  const pendingTotal = Math.max(0, totalTasks - completed) // all - completed

  // For the small primary progress bar: show days until next review.
  // We don't have a real date from the snippet, so expose a constant here.
  // Replace `nextReviewInDays` with a prop or API value in your real app.
  const nextReviewInDays = 5 // <-- change as needed
  const reviewCycleDays = 14 // the cycle length used to calculate bar width
  const barPct = Math.min(100, Math.round(((reviewCycleDays - nextReviewInDays) / reviewCycleDays) * 100))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-6">
      {/* Left: small summary cards (2x2) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pending Tasks */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Tasks in Progress</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {pending}
            </CardTitle>
            <Badge variant="outline" className="text-yellow-600 dark:text-yellow-400 border-yellow-600/40 w-fit">
              <IconClock className="mr-1 size-4" /> +5%
            </Badge>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="font-medium text-yellow-700 dark:text-yellow-400 flex gap-2 items-center">
              Most activity in “Website Redesign"
            </div>
            <div className="text-muted-foreground">Current sprint progress improving</div>
          </CardFooter>
        </Card>

        {/* Blocked Tasks */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Blocked Tasks</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {blocked}
            </CardTitle>
            <Badge variant="outline" className="text-destructive border-destructive/40 w-fit">
              <IconAlertTriangle className="mr-1 size-4" /> +3
            </Badge>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="font-medium text-destructive flex gap-2 items-center">
              Review dependencies <IconAlertTriangle className="size-4" />
            </div>
            <div className="text-muted-foreground">Needs project manager attention</div>
          </CardFooter>
        </Card>

        {/* Completed Tasks */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Completed Tasks</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {completed}
            </CardTitle>
            <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-600/40 w-fit">
              <IconCheck className="mr-1 size-4" /> +12%
            </Badge>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="font-medium text-green-600 dark:text-green-400 flex gap-2 items-center">
              Excellent progress <IconCheck className="size-4" />
            </div>
            <div className="text-muted-foreground">56% of total project workload</div>
          </CardFooter>
        </Card>

        {/* Summary (updated) */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Summary</CardDescription>

            <div className="flex flex-col gap-2">
              {/* Number of pending tasks */}
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {pendingTotal}
              </CardTitle>

              {/* Small text explaining what this number is */}
              <div className="text-muted-foreground text-sm">Pending tasks</div>

              {/* Primary bar with days until next review */}
              <div className="mt-2 w-full">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <div>{nextReviewInDays} days til next review</div>
                  <div className="tabular-nums">{reviewCycleDays - nextReviewInDays} / {reviewCycleDays} days</div>
                </div>
                <Progress value={barPct}></Progress>
              </div>
            </div>
          </CardHeader>

          <CardFooter className="text-sm text-muted-foreground">Progress based on active tasks</CardFooter>
        </Card>
      </div>

      {/* Right: large chart card + users table card side-by-side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Donut Chart Card */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Current project status</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                              {totalTasks}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                              Total
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm text-muted-foreground">Overview of all active tasks</CardFooter>
        </Card>

        {/* Users & tasks table card (non-draggable) */}
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Project Team</CardTitle>
            <CardDescription>Tasks per user</CardDescription>
          </CardHeader>

          {/* KEY FIX: 
            The combination of 'flex-1' and 'min-h-0' is crucial here. 
            'flex-1' lets it fill available space, and 'min-h-0' 
            tells the flex parent (the Card) that this child can shrink 
            down to a height of zero if needed, respecting the fixed height 
            we'll set inside UsersTable. 
          */}
          <CardContent className="flex-1 overflow-auto **min-h-0**">
            <UsersTable initialData={usersData} />
          </CardContent>

          <CardFooter className="text-sm text-muted-foreground">Filter and sort to find owners quickly</CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Simple users table with filtering and sorting — replace with your real table implementation as needed
function UsersTable({ initialData }: { initialData: { name: string; completed: number; blocked: number; pending: number }[] }) {
  const [data] = React.useState(() =>
    initialData.map((d) => ({ ...d, total: d.completed + d.pending + d.blocked }))
  )
  const [query, setQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState<string | null>("total")
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = data.filter((d) => d.name.toLowerCase().includes(q))
    if (sortBy) {
      list = [...list].sort((a, b) => {
        const aV = (a as any)[sortBy]
        const bV = (b as any)[sortBy]
        if (aV === bV) return 0
        const comp = aV > bV ? 1 : -1
        return sortDir === "asc" ? comp : -comp
      })
    }
    return list
  }, [data, query, sortBy, sortDir])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input placeholder="Search user" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select
          value={sortBy ?? ""}
          onValueChange={(v) => setSortBy(v || null)}
        >
          <SelectTrigger className="w-44" size="sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="total">Total</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortDir} onValueChange={(v) => setSortDir(v as any)}>
          <SelectTrigger className="w-28" size="sm">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Desc</SelectItem>
            <SelectItem value="asc">Asc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KEY FIX: 
        Apply a fixed height (like h-64) and overflow-y-auto to the wrapper. 
        I also added 'sticky' to the TableHeader for a better scroll UX.
      */}
      <div className="rounded border overflow-y-auto h-64">
        <Table>
          <TableHeader className="**sticky top-0 bg-background z-10**">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Completed</TableHead>
              <TableHead className="text-right">Blocked</TableHead>
              <TableHead className="text-right">Pending</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell className="text-right tabular-nums">{row.completed}</TableCell>
                <TableCell className="text-right tabular-nums">{row.blocked}</TableCell>
                <TableCell className="text-right tabular-nums">{row.pending}</TableCell>
                <TableCell className="text-right font-medium tabular-nums">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}