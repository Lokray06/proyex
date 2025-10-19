"use client"

import * as React from "react"
import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// Shared list of users
const users = [
  "David Lee",
  "Emily Whalen",
  "Jamik Tashpulatov",
  "Frank Miller",
  "Grace Ho",
  "Olivia Brown",
  "Liam Carter",
  "Sophia Martinez",
  "Noah Williams",
  "Ava Thompson",
  "Ethan Johnson",
  "Isabella Davis",
  "Mason Wilson",
  "Mia Anderson",
  "Lucas Taylor",
  "Amelia Thomas",
  "Logan Moore",
  "Harper White",
  "Elijah Hall",
  "Charlotte Lewis",
  "James Clark",
  "Evelyn Robinson",
  "Benjamin Walker",
  "Abigail Young",
  "Henry King",
]

export function AddProject() {
  const [open, setOpen] = useState(false)
  const [selectedOwners, setSelectedOwners] = useState<string[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string[]>([])
  const [ownerSearch, setOwnerSearch] = useState("")
  const [teamSearch, setTeamSearch] = useState("")

  const toggleSelection = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const projectName =
      (form.elements.namedItem("projectName") as HTMLInputElement)?.value ||
      "New Project"

    toast.success(`Project "${projectName}" created successfully!`)
    setSelectedOwners([])
    setSelectedTeam([])
    setOpen(false)
  }

  const filteredOwners = users.filter((u) =>
    u.toLowerCase().includes(ownerSearch.toLowerCase())
  )

  const filteredTeam = users.filter((u) =>
    u.toLowerCase().includes(teamSearch.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="gap-2 p-2"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <Plus className="size-3.5 shrink-0" />
          </div>
          Add project
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Define the scope, owner, and team for the new project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Project Name */}
            <div className="grid gap-3">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                name="projectName"
                placeholder="E.g., Q4 Website Redesign"
                required
              />
            </div>

            {/* Project Description */}
            <div className="grid gap-3">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                name="projectDescription"
                placeholder="Briefly outline the goals and deliverables."
              />
            </div>

            {/* Two-column grid: Owner + Team Selectors */}
            <div className="grid grid-cols-2 gap-4">
              {/* Project Owner(s) */}
              <div className="grid gap-3">
                <Label htmlFor="owners">Project Owner(s)</Label>
                <div className="border rounded-md">
                  {/* Search bar */}
                  <div className="flex items-center border-b p-2">
                    <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search owners..."
                      className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={ownerSearch}
                      onChange={(e) => setOwnerSearch(e.target.value)}
                    />
                  </div>

                  {/* Scrollable list */}
                  <ScrollArea className="h-48">
                    <div className="p-2 space-y-2">
                      {filteredOwners.map((user) => {
                        const selected = selectedOwners.includes(user)
                        return (
                          <div
                            key={user}
                            className={cn(
                              "flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer",
                              selected && "bg-accent/60"
                            )}
                            onClick={() =>
                              toggleSelection(
                                user,
                                selectedOwners,
                                setSelectedOwners
                              )
                            }
                          >
                            <Checkbox
                              id={`owner-${user}`}
                              checked={selected}
                              onCheckedChange={(checked) => {
                                if (checked !== selected)
                                  toggleSelection(
                                    user,
                                    selectedOwners,
                                    setSelectedOwners
                                  )
                              }}
                            />
                            <Label
                              htmlFor={`owner-${user}`}
                              className="cursor-pointer text-sm font-medium"
                            >
                              {user}
                            </Label>
                          </div>
                        )
                      })}

                      {filteredOwners.length === 0 && (
                        <p className="text-sm text-muted-foreground italic px-2 py-3">
                          No users found
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* Project Team */}
              <div className="grid gap-3">
                <Label htmlFor="team">Project Team</Label>
                <div className="border rounded-md">
                  {/* Search bar */}
                  <div className="flex items-center border-b p-2">
                    <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search team..."
                      className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={teamSearch}
                      onChange={(e) => setTeamSearch(e.target.value)}
                    />
                  </div>

                  {/* Scrollable list */}
                  <ScrollArea className="h-48">
                    <div className="p-2 space-y-2">
                      {filteredTeam.map((user) => {
                        const selected = selectedTeam.includes(user)
                        return (
                          <div
                            key={user}
                            className={cn(
                              "flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer",
                              selected && "bg-accent/60"
                            )}
                            onClick={() =>
                              toggleSelection(
                                user,
                                selectedTeam,
                                setSelectedTeam
                              )
                            }
                          >
                            <Checkbox
                              id={`team-${user}`}
                              checked={selected}
                              onCheckedChange={(checked) => {
                                if (checked !== selected)
                                  toggleSelection(
                                    user,
                                    selectedTeam,
                                    setSelectedTeam
                                  )
                              }}
                            />
                            <Label
                              htmlFor={`team-${user}`}
                              className="cursor-pointer text-sm font-medium"
                            >
                              {user}
                            </Label>
                          </div>
                        )
                      })}

                      {filteredTeam.length === 0 && (
                        <p className="text-sm text-muted-foreground italic px-2 py-3">
                          No users found
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
