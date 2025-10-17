"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Settings } from "lucide-react"

interface NavItem {
  title: string
  url: string
  icon?: React.ElementType
}

interface MyCommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: NavItem[]
}

export function MyCommandDialog({ open, onOpenChange, items }: MyCommandDialogProps) {
  const router = useRouter()

  // ⌘K / Ctrl+K to open or close
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === "Escape") onOpenChange(false)
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const handleSelect = (path: string) => {
    router.push(path)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a page or command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Main">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <CommandItem
                key={item.title}
                onSelect={() => handleSelect(item.url)}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span>{item.title}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Other">
          <CommandItem onSelect={() => handleSelect("/settings")}>
            <Settings className="mr-2 h-4 w-4"></Settings>
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
