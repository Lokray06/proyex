"use client"

import * as React from "react"
import { useState } from "react"
import { IconCirclePlusFilled } from "@tabler/icons-react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { toast } from "sonner" // 👈 1. Import toast

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogClose, // Keep DialogClose for the Cancel button
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { SidebarMenuButton } from "./ui/sidebar"

// Sample data (as before)
const employees = ["Alice Johnson", "Bob Smith", "Charlie Brown"]
const reviewers = ["Eddie Lake", "Jamik Tashpulatov", "Emily Whalen"]
const priorities = [
    { value: "1", label: "1 - Very Low" },
    { value: "2", label: "2 - Low" },
    { value: "3", label: "3 - Medium" },
    { value: "4", label: "4 - High" },
    { value: "5", label: "5 - Critical" },
]

export function QuickCreate() {
    // 👈 2. Add state for controlling the Dialog
    const [open, setOpen] = useState(false)
    const [targetDate, setTargetDate] = useState<Date | undefined>(undefined)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // In a real app, you would collect form data (e.g., using FormData or React state)
        // and send it to your backend here.

        // Simulating form data collection
        const form = e.currentTarget
        const taskName = (form.elements.namedItem("taskName") as HTMLInputElement)?.value || 'New Task'

        // 3. Show success toast and close dialog
        toast.success(`Task "${taskName}" created successfully!`)
        
        // Reset state and close the dialog
        setTargetDate(undefined)
        setOpen(false) 
    }

    return (
        // 👈 Use the 'open' state to control the dialog
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <SidebarMenuButton
                    tooltip="Quick Create Task"
                    className="hover:cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 w-full duration-200 ease-linear"
                >
                    <IconCirclePlusFilled className="h-4 w-4 mr-2" />
                    Quick create Task
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new task and set a target date.
                    </DialogDescription>
                </DialogHeader>
                {/* 👈 Attach handleSubmit to the form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Task Name */}
                        <div className="grid gap-3">
                            <Label htmlFor="task-name">Task Name</Label>
                            <Input
                                id="task-name"
                                name="taskName"
                                placeholder="E.g., Update Q3 report data"
                                required
                            />
                        </div>

                        {/* Task Description */}
                        <div className="grid gap-3">
                            <Label htmlFor="task-description">Description</Label>
                            <Textarea
                                id="task-description"
                                name="taskDescription"
                                placeholder="Provide a brief description of the task."
                            />
                        </div>

                        {/* Assignee, Reviewer, Priority, Target Date in two columns */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Target Date */}
                            <div className="grid gap-3">
                                <Label htmlFor="target-date">Target Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="target-date"
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !targetDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {targetDate
                                                ? format(targetDate, "PPP")
                                                : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={targetDate}
                                            onSelect={setTargetDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Priority */}
                            <div className="grid gap-3">
                                <Label htmlFor="priority">Priority</Label>
                                <Select name="priority" required>
                                    <SelectTrigger id="priority" className="w-full">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorities.map((p) => (
                                            <SelectItem key={p.value} value={p.value}>
                                                {p.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Employee and Reviewer in two columns */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Employee to Assign */}
                            <div className="grid gap-3">
                                <Label htmlFor="employee">Assign Employee</Label>
                                <Select name="employee">
                                    <SelectTrigger id="employee" className="w-full">
                                        <SelectValue placeholder="Select an employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employees.map((name) => (
                                            <SelectItem key={name} value={name}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Reviewer to Assign */}
                            <div className="grid gap-3">
                                <Label htmlFor="reviewer">Assign Reviewer</Label>
                                <Select name="reviewer">
                                    <SelectTrigger id="reviewer" className="w-full">
                                        <SelectValue placeholder="Select a reviewer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {reviewers.map((name) => (
                                            <SelectItem key={name} value={name}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        {/* The Cancel button can still use DialogClose */}
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        {/* The Create Task button is now type="submit" and handles closing via the form's onSubmit */}
                        <Button type="submit">Create Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}