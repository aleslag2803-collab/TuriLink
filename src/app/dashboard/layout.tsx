import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="lg:pl-72">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 lg:hidden flex items-center gap-4 border-b border-border bg-card px-4 py-3">
          <MobileNav />
          <h1 className="text-lg font-semibold">TuriLink</h1>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}
