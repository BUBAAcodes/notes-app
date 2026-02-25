import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "./ui/sidebar";
interface PageWrapperProps {
  children: React.ReactNode;
breadcrumbs:{
    label:string;
    href:string;
}[];
}

export function PageWrapper({children,breadcrumbs}:PageWrapperProps) {
    return (
        <div className="flex flex-col gap-4">
        <header className="flex items-center gap-4 px-4 py-2">
          <SidebarTrigger/>
            <Breadcrumb>
  <BreadcrumbList>
    {breadcrumbs.map ((breadcrumb) =>(
      <BreadcrumbItem key={breadcrumb.href}>
        <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </BreadcrumbList>
</Breadcrumb>
</header>
  {children}  
        </div>
        
    );
}