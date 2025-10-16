"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Icon,
  Kanban,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { IconDashboard, IconMessage, IconSearch, IconUsers } from "@tabler/icons-react"

interface MyCommandDialogProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function MyCommandDialog({ className, ...props }: MyCommandDialogProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <div className="p-[8px] w-full">
        <div className="items-center hover:bg-muted rounded-sm flex gap-2 cursor-pointer p-[8px]" onClick={() => { setOpen((open) => !open) }}>
          <IconSearch width={16} className=""></IconSearch>
          <p className="text-sm">Search</p>
          <p className="text-muted-foreground text-sm">
            Press{" "}
            <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
              <span className="text-xs">⌘</span>K
            </kbd>
          </p>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Main">
              <CommandItem>
                <IconDashboard />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem>
                <Kanban />
                <span>Kanban</span>
              </CommandItem>
              <CommandItem>
                <IconMessage />
                <span>Messages</span>
              </CommandItem>
              <CommandItem>
                <IconUsers />
                <span>Team</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </>
  )
}
