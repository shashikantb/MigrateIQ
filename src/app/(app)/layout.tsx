"use client"
import { Logo } from "@/components/icons/logo"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  PenSquare,
  GitFork,
  Lightbulb,
  Activity,
  Terminal,
  LogOut,
  Users,
  Mail,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="text-primary" />
            <span className="text-lg font-semibold font-headline">MigrateIQ</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/page">
                <SidebarMenuButton
                  isActive={isActive('/page')}
                  tooltip="Dashboard"
                  icon={<LayoutDashboard />}
                >
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/designer">
                <SidebarMenuButton
                  isActive={isActive('/designer')}
                  tooltip="Blueprint Designer"
                  icon={<PenSquare />}
                >
                  Blueprint Designer
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/visualizer">
                <SidebarMenuButton
                  isActive={isActive('/visualizer')}
                  tooltip="Dependency Visualizer"
                  icon={<GitFork />}
                >
                  Dependency Visualizer
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/recommendations">
                <SidebarMenuButton
                  isActive={isActive('/recommendations')}
                  tooltip="AI Recommendations"
                  icon={<Lightbulb />}
                >
                  AI Recommendations
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/monitoring">
                <SidebarMenuButton
                  isActive={isActive('/monitoring')}
                  tooltip="Logs & Monitoring"
                  icon={<Activity />}
                >
                  Logs & Monitoring
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/chatops">
                <SidebarMenuButton
                  isActive={isActive('/chatops')}
                  tooltip="ChatOps"
                  icon={<Terminal />}
                >
                  ChatOps Interface
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarHeader className="mt-auto">
           <Link href="/login">
            <SidebarMenuButton icon={<LogOut />}>
              Logout
            </SidebarMenuButton>
           </Link>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center p-4 border-b">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold font-headline">
              {pathname.split('/').pop()?.replace('-', ' ').replace(/^\w/, c => c.toUpperCase()) || 'Dashboard'}
            </h1>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-background/40">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
