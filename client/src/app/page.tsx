"use client"
import { AppSidebar } from "@/components/app-sidebar";import Editor from "@/components/Editor";
;
import { SiteHeader } from "@/components/site-header";
import { Toolbar } from "@/components/Toolbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Editor />
      </SidebarInset>
    </SidebarProvider>
    </>
  );
}
