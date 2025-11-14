"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { LayoutDashboard, Calendar, CreditCard, User, LogOut, Menu, Sparkles, BookmarkCheck } from 'lucide-react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
  { href: "/turista/dashboard", label: "Explorar", icon: LayoutDashboard },
  { href: "/turista/reservar", label: "Reservar", icon: BookmarkCheck },
  { href: "/turista/reservas", label: "Mis Reservas", icon: Calendar },
  { href: "/turista/ia-planner", label: "IA Planner", icon: Sparkles },
  { href: "/turista/pagos", label: "Pagos", icon: CreditCard },
  { href: "/turista/perfil", label: "Perfil", icon: User },
]

export default function TuristaLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.tipo !== "turista") {
      router.push("/guia/dashboard")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.tipo !== "turista") {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <Link href="/turista/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">TuriLink</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar || "/placeholder-user.jpg"} />
                <AvatarFallback>{user.nombre.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user.nombre}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() => {
                logout()
                router.push("/")
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SidebarTrigger>
              <div className="flex-1" />
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Ver sitio público
              </Link>
            </div>
          </header>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
