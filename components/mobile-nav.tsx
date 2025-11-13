"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { MapPin, Users, CreditCard, Settings, UserPlus, Building2, Sparkles, LayoutDashboard } from "lucide-react"

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

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          <div className="px-6 py-8 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TuriLink</h1>
                <p className="text-xs text-muted-foreground">Conecta & Descubre</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  Principal
                </p>
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50",
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

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  Para Guías
                </p>
                <ul className="space-y-1">
                  {guideNavigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50",
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
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
