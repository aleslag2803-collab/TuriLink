"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Compass, LogOut, User } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  tipoRequerido?: "turista" | "guia"
}

export function DashboardLayout({ children, tipoRequerido }: DashboardLayoutProps) {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (tipoRequerido && user?.tipo !== tipoRequerido) {
      router.push(user?.tipo === "guia" ? "/guia/dashboard" : "/turista/dashboard")
    }
  }, [isAuthenticated, user, tipoRequerido, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated || (tipoRequerido && user?.tipo !== tipoRequerido)) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link
            href={user?.tipo === "guia" ? "/guia/dashboard" : "/turista/dashboard"}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">TuriLink</span>
          </Link>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.nombre} />
                    <AvatarFallback>{user?.nombre.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.nombre}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={user?.tipo === "guia" ? "/guia/perfil" : "/turista/perfil"}>
                    <User className="w-4 h-4 mr-2" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
