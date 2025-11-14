"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
)

type ReservationStatus = "pagada" | "pendiente" | "aceptada_sin_pago"

export interface TourReservation {
  id: string
  tourTitle: string
  tourType: string
  clientName: string
  email: string
  phone: string
  date: string
  time: string
  participants: number
  price: number
  totalAmount: number
  status: ReservationStatus
  bookingDate: string
  paymentDueDate?: string
  notes?: string
}

interface TourReservationsListProps {
  tours: Array<{
    id: string
    title: string
    type: string
    price: number
    paidBookings?: number
    pendingBookings?: number
    acceptedUnpaidBookings?: number
  }>
  reservations?: TourReservation[]
}

export default function TourReservationsList({
  tours,
  reservations: externalReservations = [],
}: TourReservationsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | ReservationStatus>("all")
  const [tourFilter, setTourFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Generar reservaciones de ejemplo
  const mockReservations: TourReservation[] = useMemo(() => {
    if (externalReservations.length > 0) return externalReservations

    const reservations: TourReservation[] = []
    let id = 1

    tours.forEach((tour) => {
      // Reservas pagadas
      for (let i = 0; i < (tour.paidBookings || 0); i++) {
        const date = new Date()
        date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1)
        reservations.push({
          id: `${id++}`,
          tourTitle: tour.title,
          tourType: tour.type,
          clientName: `Cliente Pagado ${i + 1}`,
          email: `cliente${i}@example.com`,
          phone: "+34 612 34 56 78",
          date: date.toISOString().split("T")[0],
          time: `${9 + Math.floor(Math.random() * 8)}:00`,
          participants: Math.floor(Math.random() * 5) + 1,
          price: tour.price,
          totalAmount: tour.price * (Math.floor(Math.random() * 5) + 1),
          status: "pagada",
          bookingDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          notes: "Reserva confirmada y pagada",
        })
      }

      // Reservas pendientes de aceptar
      for (let i = 0; i < (tour.pendingBookings || 0); i++) {
        const date = new Date()
        date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1)
        reservations.push({
          id: `${id++}`,
          tourTitle: tour.title,
          tourType: tour.type,
          clientName: `Cliente Pendiente ${i + 1}`,
          email: `pending${i}@example.com`,
          phone: "+34 612 34 56 78",
          date: date.toISOString().split("T")[0],
          time: `${9 + Math.floor(Math.random() * 8)}:00`,
          participants: Math.floor(Math.random() * 5) + 1,
          price: tour.price,
          totalAmount: tour.price * (Math.floor(Math.random() * 5) + 1),
          status: "pendiente",
          bookingDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          paymentDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          notes: "Pendiente de pago del cliente",
        })
      }

      // Reservas aceptadas sin pago
      for (let i = 0; i < (tour.acceptedUnpaidBookings || 0); i++) {
        const date = new Date()
        date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1)
        reservations.push({
          id: `${id++}`,
          tourTitle: tour.title,
          tourType: tour.type,
          clientName: `Cliente Aceptado ${i + 1}`,
          email: `accepted${i}@example.com`,
          phone: "+34 612 34 56 78",
          date: date.toISOString().split("T")[0],
          time: `${9 + Math.floor(Math.random() * 8)}:00`,
          participants: Math.floor(Math.random() * 5) + 1,
          price: tour.price,
          totalAmount: tour.price * (Math.floor(Math.random() * 5) + 1),
          status: "aceptada_sin_pago",
          bookingDate: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          paymentDueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          notes: "Guía aceptó, pendiente pago del turista",
        })
      }
    })

    return reservations
  }, [tours, externalReservations])

  // Filtrar reservaciones
  const filteredReservations = useMemo(() => {
    return mockReservations.filter((reservation) => {
      const matchesSearch =
        reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.tourTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || reservation.status === statusFilter
      const matchesTour =
        tourFilter === "all" || reservation.tourTitle === tourFilter

      return matchesSearch && matchesStatus && matchesTour
    })
  }, [mockReservations, searchTerm, statusFilter, tourFilter])

  const getStatusIcon = (status: ReservationStatus) => {
    switch (status) {
      case "pagada":
        return <CheckCircleIcon />
      case "pendiente":
        return <AlertCircleIcon />
      case "aceptada_sin_pago":
        return <ClockIcon />
    }
  }

  const getStatusBadgeClass = (status: ReservationStatus) => {
    switch (status) {
      case "pagada":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "aceptada_sin_pago":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  const getStatusLabel = (status: ReservationStatus) => {
    switch (status) {
      case "pagada":
        return "✓ Pagada"
      case "pendiente":
        return "⚠ Pendiente"
      case "aceptada_sin_pago":
        return "⏱ Aceptada (sin pago)"
    }
  }

  const stats = {
    pagadas: mockReservations.filter((r) => r.status === "pagada").length,
    pendientes: mockReservations.filter((r) => r.status === "pendiente").length,
    aceptadas: mockReservations.filter((r) => r.status === "aceptada_sin_pago").length,
  }

  return (
    <div className="space-y-6">
      {/* Tarjetas de resumen */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircleIcon />
              Confirmadas y Pagadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.pagadas}</p>
            <p className="text-xs text-muted-foreground">Reservas completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircleIcon />
              Pendientes de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.pendientes}</p>
            <p className="text-xs text-muted-foreground">Esperando confirmación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ClockIcon />
              Aceptadas (sin pago)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.aceptadas}</p>
            <p className="text-xs text-muted-foreground">Turista debe pagar</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reservas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon />
              <Input
                placeholder="Buscar por cliente, tour o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pagada">Pagada</SelectItem>
                <SelectItem value="pendiente">Pendiente de pago</SelectItem>
                <SelectItem value="aceptada_sin_pago">Aceptada (sin pago)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tourFilter} onValueChange={setTourFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por tour" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tours</SelectItem>
                {tours.map((tour) => (
                  <SelectItem key={tour.id} value={tour.title}>
                    {tour.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lista de reservaciones */}
          <div className="space-y-3 mt-4">
            {filteredReservations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No se encontraron reservas que coincidan con los filtros.</p>
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <Collapsible
                  key={reservation.id}
                  open={expandedId === reservation.id}
                  onOpenChange={(open) => setExpandedId(open ? reservation.id : null)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div>{getStatusIcon(reservation.status)}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">{reservation.tourTitle}</h3>
                          <p className="text-sm text-muted-foreground">{reservation.clientName}</p>
                          <p className="text-xs text-muted-foreground">{reservation.date} • {reservation.time}</p>
                        </div>
                      </div>

                      <div className="text-right mr-4">
                        <p className="font-bold text-lg">${reservation.totalAmount}</p>
                        <Badge className={`mt-1 ${getStatusBadgeClass(reservation.status)}`}>
                          {getStatusLabel(reservation.status)}
                        </Badge>
                      </div>

                      <ChevronDownIcon isOpen={expandedId === reservation.id} />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t p-4 space-y-3 bg-muted/30">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Cliente</p>
                          <p className="text-sm text-muted-foreground">{reservation.clientName}</p>
                          <p className="text-sm text-muted-foreground">{reservation.email}</p>
                          <p className="text-sm text-muted-foreground">{reservation.phone}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Detalles de la Reserva</p>
                          <p className="text-sm text-muted-foreground">
                            Tour: {reservation.tourTitle} ({reservation.tourType})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Participantes: {reservation.participants}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Precio unitario: ${reservation.price}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Fechas</p>
                          <p className="text-sm text-muted-foreground">
                            Reservado: {reservation.bookingDate}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Tour: {reservation.date} {reservation.time}
                          </p>
                          {reservation.paymentDueDate && (
                            <p className="text-sm text-muted-foreground">
                              Vencimiento: {reservation.paymentDueDate}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-medium">Resumen Financiero</p>
                          <p className="text-sm text-muted-foreground">
                            Total: <span className="font-bold">${reservation.totalAmount}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Estado: {getStatusLabel(reservation.status)}
                          </p>
                        </div>
                      </div>

                      {reservation.notes && (
                        <div>
                          <p className="text-sm font-medium">Notas</p>
                          <p className="text-sm text-muted-foreground">{reservation.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        {reservation.status === "pendiente" && (
                          <>
                            <Button size="sm" variant="outline">
                              Enviar recordatorio de pago
                            </Button>
                            <Button size="sm" variant="outline">
                              Cancelar reserva
                            </Button>
                          </>
                        )}
                        {reservation.status === "aceptada_sin_pago" && (
                          <>
                            <Button size="sm" variant="outline">
                              Enviar factura
                            </Button>
                            <Button size="sm" variant="outline">
                              Marcar como pagada
                            </Button>
                          </>
                        )}
                        {reservation.status === "pagada" && (
                          <Button size="sm" variant="outline">
                            Ver confirmación
                          </Button>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
