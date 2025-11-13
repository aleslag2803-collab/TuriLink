"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  MapPin,
  Users,
  Compass,
  CreditCard,
  Star,
  Settings,
  UserPlus,
  Building2,
  Sparkles,
  LayoutDashboard,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explorar Guías", href: "/guides", icon: Users },
  { name: "Lugares", href: "/locals", icon: MapPin },
  { name: "Recomendaciones", href: "/recommendations", icon: Sparkles },
  { name: "Pagos", href: "/payments", icon: CreditCard },
  { name: "Mi Perfil", href: "/profile", icon: Settings },
]

const guideNavigation = [
  { name: "Perfil de Guía", href: "/guide-profile", icon: UserPlus },
  { name: "Agregar Lugar", href: "/locals/new", icon: Building2 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Compass className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">TuriLink</h1>
            <p className="text-xs text-muted-foreground">Conecta & Descubre</p>
          </div>
        </Link>

        <nav className="flex flex-1 flex-col gap-y-7">
          {/* Main Navigation */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Principal</p>
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Guide Section */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Para Guías</p>
            <ul className="space-y-1">
              {guideNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Bottom Card */}
          <div className="mt-auto">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-4 border border-primary/20">
              <Star className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold text-sm mb-1 text-foreground">¿Eres guía local?</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Únete a nuestra red de guías certificados
              </p>
              <Link
                href="/register/guide"
                className="inline-flex items-center justify-center w-full rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Registrarse Ahora
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
