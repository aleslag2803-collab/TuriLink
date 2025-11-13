"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Star, Heart, Clock, Users, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function TouristDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explora México</h1>
          <p className="text-muted-foreground">Descubre experiencias auténticas con guías locales</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/turista/ia-planner">
            <Sparkles className="w-4 h-4" />
            Planificar con IA
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximas Reservas</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Tours confirmados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tours Realizados</CardTitle>
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Experiencias completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Heart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Tours guardados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Puntos Viajero</CardTitle>
            <Star className="w-4 h-4 text-accent fill-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850</div>
            <p className="text-xs text-muted-foreground mt-1">Nivel: Gold</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar tours, experiencias, destinos..." className="pl-10" />
            </div>
            <Button>Buscar</Button>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Tours */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tours Destacados</h2>
          <Button variant="outline" asChild>
            <Link href="/turista/reservas">Ver Todos</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Tour Histórico Centro CDMX",
              guide: "Carlos Mendoza",
              price: "$350",
              rating: 4.9,
              reviews: 156,
              duration: "3 horas",
              category: "Historia",
            },
            {
              title: "Gastronomía de Coyoacán",
              guide: "Ana García",
              price: "$750",
              rating: 5.0,
              reviews: 89,
              duration: "4 horas",
              category: "Gastronomía",
            },
            {
              title: "Arte y Murales de CDMX",
              guide: "Miguel Torres",
              price: "$400",
              rating: 4.8,
              reviews: 123,
              duration: "3.5 horas",
              category: "Arte",
            },
          ].map((tour, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
                <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur">{tour.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{tour.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-xs">({tour.reviews})</span>
                    </div>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{tour.guide}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">{tour.price}</div>
                    <div className="text-xs text-muted-foreground">MXN por persona</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {tour.duration}
                  </div>
                </div>
                <Button className="w-full">Reservar Ahora</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Booking */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Próximo Tour</CardTitle>
          <CardDescription>Preparate para tu próxima aventura</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">Tour Histórico Centro CDMX</h3>
                  <Badge className="bg-green-eco text-primary-foreground">Confirmado</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Guía: Carlos Mendoza</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  25 Enero 2025
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  10:00 AM
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />2 personas
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">$700</div>
                <div className="text-xs text-muted-foreground">MXN Total</div>
              </div>
              <Button asChild>
                <Link href="/turista/reservas">Ver Detalles</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
