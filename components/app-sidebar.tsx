import * as React from "react"
import { Suspense } from "react"
import Image from "next/image";
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getNotebooks } from "@/server/notebooks";
import { SidebarData } from "./sidebar-data";

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
    <Image src="/sotliy.png" alt="Logo" width={40} height={40} />    
    <h2 >Notliy</h2>
    </div>
    <React.Suspense>
        <SearchForm />
      </React.Suspense>
      </SidebarHeader>
      <SidebarContent className="gap-0">
       
        <SidebarData data={data}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
