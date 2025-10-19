"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Send } from "lucide-react"

export default function Messages({
  params,
}: {
  params: { projectId: string }
}) {
  const [selectedChat, setSelectedChat] = useState<string>("1")
  const [searchQuery, setSearchQuery] = useState("")
  const [messageText, setMessageText] = useState("")

  const [chatData, setChatData] = useState({
    "1": [
      { sender: "Alice Johnson", content: "Hey! Have you checked the latest mockups?", time: "10:20 AM", mine: false },
      { sender: "Alice Johnson", content: "I've changed a bit of everything", time: "10:20 AM", mine: false },
      { sender: "Alice Johnson", content: "As you told me", time: "10:20 AM", mine: false },
      { sender: "You", content: "Yes! I really like the new layout.", time: "10:22 AM", mine: true },
      { sender: "Alice Johnson", content: "Perfect, let’s finalize them today.", time: "10:32 AM", mine: false },
    ],
    "2": [
      { sender: "Bob Lee", content: "Can you review my PR?", time: "09:10 AM", mine: false },
    ],
    "3": [
      { sender: "Clara Smith", content: "The API is ready!", time: "Yesterday", mine: false },
    ],
  })

  const contacts = [
    { id: "1", name: "Alice Johnson", lastMessage: "Let’s finalize the design today.", time: "10:32 AM" },
    { id: "2", name: "Bob Lee", lastMessage: "Can you review my PR?", time: "09:10 AM" },
    { id: "3", name: "Clara Smith", lastMessage: "The API is ready!", time: "Yesterday" },
  ]

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const messages = chatData[selectedChat] || []

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const newMessage = {
      sender: "You",
      content: messageText.trim(),
      time,
      mine: true,
    }

    setChatData((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }))

    setMessageText("")
  }

  return (
    <div className="flex w-full min-h-full">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 border-r flex flex-col min-h-0">
        <div className="p-4 flex-shrink-0">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-0">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChat(c.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-accent/40 transition ${selectedChat === c.id ? "bg-accent" : ""
                    }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`} />
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-auto">
                    <p className="font-medium truncate">{c.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{c.lastMessage}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{c.time}</span>
                </button>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">No contacts found.</p>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* RIGHT CHAT PANEL */}
      <div className="flex-1 flex flex-col min-h-full">
        <Card className="flex-1 flex flex-col gap-0 rounded-none border-0 min-h-0 pb-0 bg-background-muted">
          <CardHeader className="flex-shrink-0 border-b">
            <CardTitle className="flex items-center gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${contacts.find((c) => c.id === selectedChat)?.name
                    }`}
                />
                <AvatarFallback>
                  {contacts.find((c) => c.id === selectedChat)?.name[0]}
                </AvatarFallback>
              </Avatar>
              <span>{contacts.find((c) => c.id === selectedChat)?.name}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            <ScrollArea className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
              {messages.map((m, i) => {
                const prev = messages[i - 1]
                const next = messages[i + 1]

                const isPrevSame = prev && prev.mine === m.mine
                const isNextSame = next && next.mine === m.mine

                const base = "max-w-xs px-4 py-2"
                const side = m.mine
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"

                const shape = m.mine
                  ? `${!isPrevSame ? "rounded-tr-4xl" : "rounded-tr-sm"} ${!isNextSame ? "rounded-br-4xl" : "rounded-br-sm"
                  } rounded-tl-4xl rounded-bl-4xl`
                  : `${!isPrevSame ? "rounded-tl-4xl" : "rounded-tl-sm"} ${!isNextSame ? "rounded-bl-4xl" : "rounded-bl-sm"
                  } rounded-tr-4xl rounded-br-4xl`

                return (
                  <div
                    key={i}
                    className={`${isPrevSame ? "mt-1" : "mt-2"} flex ${m.mine ? "justify-end" : "justify-start"}`} // NO mt-2 HERE
                  >
                    <div className={`${base} ${side} ${shape}`}>
                      <p>{m.content}</p>
                    </div>
                  </div>
                )
              })}
            </ScrollArea>

            {/* Message input */}
            <div className="flex items-center p-3 gap-2 border-t flex-shrink-0">
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage()
                }}
              />
              <Button size="icon" variant="default" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
