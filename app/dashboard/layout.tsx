import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import App from "next/app";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) 
{
    return <div>
        <SidebarProvider>
            <AppSidebar />
           <main>
            
            {children}
            </main>
        </SidebarProvider>
    </div>
}