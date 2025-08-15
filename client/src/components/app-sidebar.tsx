import { Calendar, CircleQuestionMark, History, Home, Inbox, MoreHorizontal, MoreVertical, Search, Settings, Settings2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import Image from "next/image"

// Menu items.
const items = [
  {
    title: "Workspace",
    url: "#",
    icon: Home,
  },
  {
    title: "Research",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Translate",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Write",
    url: "#",
    icon: Search,
  }
]

const Tools= [ 
    {
    title: "Editor",
    url: "#",
    icon: Settings,
    },
    {
    title: "Bookmarks",  
    url: "#",
    icon: Settings,
    }
]

const ChatHistory = [
    {
    title: "Lorem ipsum dolor sit amet consectetur. ",
    },
    {
        title: "Cras mattis consectetur purus sit amet.",
    },
    {
        title: "Nullam quis risus eget urna mollis ornare.",
    }
]

export function AppSidebar() {
  return (
    <Sidebar 
      className="p-2 md:p-4" 
      style={{ '--sidebar-bg': '#352442' } as React.CSSProperties}
      collapsible="offcanvas"
    >
      <SidebarContent className="bg-[#352442] text-white rounded-lg p-2 md:p-4 h-full flex flex-col overflow-hidden">
        <SidebarGroup className="flex-shrink-0">
          <SidebarGroupLabel className="text-xl md:text-2xl text-white">Vettam AI</SidebarGroupLabel>
          <Button className="bg-[#E07A53] text-white my-2 md:my-4 w-full text-sm md:text-base">
            New chat
          </Button>
          <SidebarGroupContent>
            <SidebarMenu className="bg-[#694C80] rounded-xl">
                <Badge className="m-1 md:m-2 bg-[#4F3861] text-xs md:text-sm">Features</Badge>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild className="text-white hover:bg-white/10 rounded-md text-sm md:text-base">
                    <a href={item.url}>
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden sm:inline">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupContent className="mt-1 md:mt-2">
            <SidebarMenu className="bg-[#694C80] rounded-xl">
                <Badge className="m-1 md:m-2 bg-[#4F3861] text-xs md:text-sm">Tools</Badge>
              {Tools.map((Tools) => (
                <SidebarMenuItem key={Tools.title} className="">
                  <SidebarMenuButton asChild className="text-white hover:bg-white/10 rounded-md text-sm md:text-base">
                    <a href={Tools.url}>
                      <Tools.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden sm:inline">{Tools.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="flex-1 flex flex-col min-h-0">
          <Badge className="w-full bg-[#4F3861] text-white text-xs md:text-sm font-normal flex-shrink-0">
            <History className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            <span className="hidden sm:inline">Chat History</span>
          </Badge>
          <SidebarGroupContent className="mt-1 md:mt-2 flex-1 overflow-y-auto scrollbar-none">
            <SidebarMenu className="">
              {ChatHistory.map((ChatHistory, index) => (
                <SidebarMenuItem key={index} className="group">
                  <SidebarMenuButton asChild className="text-white rounded-md flex justify-between items-center pr-1 md:pr-2 text-xs md:text-sm">
                    <div className="flex w-full items-center justify-between">
                      <span className="truncate flex-1 max-w-[120px] sm:max-w-none">{ChatHistory.title}</span>
                      <button 
                        className="p-0.5 md:p-1 hover:bg-white/20 rounded flex-shrink-0"
                      >
                        <MoreVertical className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>

        <SidebarFooter className="flex flex-col flex-shrink-0 mt-auto space-y-1 md:space-y-2">
          <div className="flex justify-between items-center">
              <div className="flex space-x-1 md:space-x-2">
              <span>
                <Image
                src="/poster.png"
                alt="User Avatar"
                width={20}
                height={20}
                className="h-4 w-4 md:h-6 md:w-6 rounded-full"
                />
              </span>
              <span>
                <Image
                src="/poster.png"
                alt="User Avatar"
                width={20}
                height={20}
                className="h-4 w-4 md:h-6 md:w-6 rounded-full"
                />
              </span>
              <span>
                <Image
                src="/poster.png"
                alt="User Avatar"
                width={20}
                height={20}
                className="h-4 w-4 md:h-6 md:w-6 rounded-full"
                />
              </span>
              </div>
            <span>
              <Image
              src = "/Bell.png"
              alt="Notification Bell"
              width={20}
              height={20}
              className="h-4 w-4 md:h-6 md:w-6"
            />
            </span>
          </div>
          <Separator className="my-0.5 md:my-1" />
          <div className="flex justify-between items-center">
            <span className="flex items-center min-w-0">
              <Image
               src="/poster.png"
                alt="User Avatar"
                width={20}
                height={20}
                className="h-4 w-4 md:h-6 md:w-6 rounded-full flex-shrink-0"
              />
              <h1 className="text-sm md:text-lg ml-1 md:ml-2 font-bold truncate hidden sm:block">John Doe</h1>
            </span>
            <span className="flex space-x-1 md:space-x-2 flex-shrink-0">
              <Settings className="h-4 w-4 md:h-6 md:w-6" />
              <CircleQuestionMark className="h-4 w-4 md:h-6 md:w-6" />
            </span>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}