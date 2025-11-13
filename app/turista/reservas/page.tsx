"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Star, MapPin } from "lucide-react"

export default function ReservasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
        <p className="text-muted-foreground">Gestiona tus tours y experiencias reservadas</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Próximas Reservas</h2>
        <div className="space-y-4">
          {[
            {
              tour: "Tour Histórico Centro CDMX",
              guide: "Carlos Mendoza",
              date: "25 Enero 2025",
              time: "10:00 AM",
              price: "$350 MXN",
              status: "Confirmado",
              people: 2,
              location: "Zócalo, frente a la Catedral",
            },
            {
              tour: "Gastronomía de Coyoacán",
              guide: "Ana García",
              date: "28 Enero 2025",
              time: "2:00 PM",
              price: "$1,500 MXN",
              status: "Confirmado",
              people: 2,
              location: "Plaza Hidalgo, Coyoacán",
            },
            {
              tour: "Teotihuacán al Amanecer",
              guide: "Miguel Torres",
              date: "2 Febrero 2025",
              time: "5:30 AM",
              price: "$800 MXN",
              status: "Pendiente de pago",
              people: 2,
              location: "Terminal Norte de Autobuses",
            },
          ].map((booking, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{booking.tour}</h3>
                        <Badge
                          variant={booking.status === "Confirmado" ? "default" : "secondary"}
                          className={booking.status === "Confirmado" ? "bg-green-eco text-primary-foreground" : ""}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Guía: {booking.guide}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {booking.people} personas
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {booking.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{booking.price}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="flex gap-2">
                      {booking.status === "Pendiente de pago" ? (
                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                          Pagar Ahora
                        </Button>
                      ) : (
                        <>
                          <Button size="sm" variant="outline">
                            Ver Detalles
                          </Button>
                          <Button size="sm" variant="ghost">
                            Cancelar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Historial de Tours</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                {
                  tour: "Xochimilco y Coyoacán",
                  date: "10 Enero 2025",
                  guide: "Laura Ramírez",
                  rating: 5,
                  price: "$600 MXN",
                },
                {
                  tour: "Museo Frida Kahlo + Casa Azul",
                  date: "5 Enero 2025",
                  guide: "Roberto Sánchez",
                  rating: 5,
                  price: "$450 MXN",
                },
                {
                  tour: "Mercados y Gastronomía",
                  date: "28 Diciembre 2024",
                  guide: "Ana García",
                  rating: 4,
                  price: "$550 MXN",
                },
              ].map((past, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <div className="font-semibold">{past.tour}</div>
                    <div className="text-sm text-muted-foreground">
                      {past.date} • {past.guide}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex">
                        {[...Array(past.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{past.price}</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Reservar otra vez
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
