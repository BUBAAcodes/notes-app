import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) 
{
    return <div>
        <SidebarProvider>
             <Suspense fallback={<div>Loading...</div>}>
        <AppSidebar />
      </Suspense>
           <main className="flex-1">
            
            {children}
            </main>
        </SidebarProvider>
    </div>
}