"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, MapPin, Calendar, Star, Plus } from "lucide-react"
import Link from "next/link"

export default function GuideDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Gestiona tus tours, experiencias y pagos</p>
        </div>
        <Button asChild>
          <Link href="/guia/tours">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Tour
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,890</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-eco" />
              <span className="text-green-eco">+12.5%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tours Completados</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span>Este mes</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Calificación</CardTitle>
            <Star className="w-4 h-4 text-accent fill-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">234 reseñas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximos Tours</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">Próximos 7 días</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Rápido</CardTitle>
          <CardDescription>Actividad reciente de tu negocio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Tours Activos</div>
              <div className="text-3xl font-bold">8</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Turistas Este Mes</div>
              <div className="text-3xl font-bold">156</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Tasa de Respuesta</div>
              <div className="text-3xl font-bold">98%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Reservas</CardTitle>
          <CardDescription>Tus tours programados para los próximos días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { tour: "Tour por la Zona Hotelera", date: "18 Noviembre", time: "10:00 AM", guests: 6 },
              { tour: "Tour Cultural", date: "19 Noviembre", time: "2:00 PM", guests: 2 },
              { tour: "Tour Parque Kabah", date: "20 Noviembre", time: "11:00 AM", guests: 8 },
            ].map((booking, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                <div>
                  <div className="font-medium">{booking.tour}</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.date} a las {booking.time}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{booking.guests} personas</Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
            <Link href="/guia/tours">Ver Todas las Reservas</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
