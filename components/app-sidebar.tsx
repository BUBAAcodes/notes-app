import * as React from "react"
import { ChevronRight, File } from "lucide-react"
import Image from "next/image";
import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getNotebooks } from "@/server/notebooks";
import { SidebarData } from "./sidebar-data";

// This is sample data.


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();
  
  const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
     ...(notebooks.notebooks?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
        })),
      })) ?? []),
  ],
}
  return (            
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-2">
    <Image src="/notliy.png" alt="Logo" width={40} height={40} />    
    <h2 >Notliy</h2>
    </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
       
        <SidebarData data={data}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
