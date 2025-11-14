"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Star, MapPin } from "lucide-react"

export default function ReservasPage() {
  // reservas persistidas (array vacío por defecto)
  const [bookings, setBookings] = useState<any[]>([])
  // reserva seleccionada para ver detalles
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("turilink_bookings")
      if (raw) {
        const parsed = JSON.parse(raw)
        setBookings(parsed || [])
      } else {
        setBookings([])
      }
    } catch (e) {
      console.error("Error leyendo reservas desde localStorage", e)
      setBookings([])
    }
  }, [])

  // elimina una reserva por índice y persiste el cambio
  function cancelBooking(index: number) {
    setBookings((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      try {
        localStorage.setItem("turilink_bookings", JSON.stringify(updated))
      } catch (e) {
        console.error("Error guardando reservas en localStorage", e)
      }
      return updated
    })
    // si el modal está abierto sobre la reserva eliminada, cerrarlo
    if (selectedBooking && bookings[index] && (selectedBooking.title || selectedBooking.tour) === (bookings[index].title || bookings[index].tour)) {
      setSelectedBooking(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
        <p className="text-muted-foreground">Gestiona tus tours y experiencias reservadas</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Próximas Reservas</h2>
        <div className="space-y-4">
          {/* Si hay reservas guardadas en localStorage las mostramos, si no usamos los ejemplos */ }
          {bookings && bookings.length > 0 ? (
            bookings.map((b, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{b.title || b.tour || "Reserva"}</h3>
                          <Badge className="bg-green-eco text-primary-foreground">Confirmado</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Guía: {b.guide || "Por asignar"}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          Fecha por definir
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Hora por definir
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          2 personas
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          Ubicación por definir
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{b.price || "-"}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedBooking(b)}>
                          Ver Detalles
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => cancelBooking(idx)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // fallback: ejemplos estáticos originales si no hay reservas persistidas
            [
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
            ))
          )}
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

      {/* Modal de detalles de reserva (para las reservas persistidas) */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedBooking(null)} />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-background rounded-lg shadow-lg overflow-auto">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedBooking.title || selectedBooking.tour}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedBooking.category || ""}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-semibold">{selectedBooking.rating ?? "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {selectedBooking.duration || "Duración por definir"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{selectedBooking.price || "-"}</div>
                  <div className="text-xs text-muted-foreground">MXN por persona</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <p><strong>Guía:</strong> {selectedBooking.guide || "Por asignar"}</p>
                <p><strong>Incluye:</strong> Visita guiada, transporte local (según tour)</p>
                <p><strong>Recomendaciones:</strong> Llevar identificación y calzado cómodo.</p>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setSelectedBooking(null)}>Cerrar</Button>
                <Button
                  className="bg-destructive text-white"
                  onClick={() => {
                    // buscar índice de la reserva en el array (por título) y cancelar
                    const idx = bookings.findIndex(b => (b.title || b.tour) === (selectedBooking.title || selectedBooking.tour))
                    if (idx !== -1) cancelBooking(idx)
                    setSelectedBooking(null)
                  }}
                >
                  Cancelar reserva
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
