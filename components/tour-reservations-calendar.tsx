"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

export type TourReservation = {
  tourId: string
  tourTitle: string
  date: string // formato: YYYY-MM-DD
  time: string // formato: HH:mm
  participants: number
  status: "pagada" | "pendiente" | "aceptada_sin_pago"
  clientName: string
}

interface TourReservationsCalendarProps {
  tours: Array<{
    id: string
    title: string
    paidBookings?: number
    pendingBookings?: number
    acceptedUnpaidBookings?: number
  }>
  reservations?: TourReservation[]
}

export default function TourReservationsCalendar({
  tours,
  reservations = [],
}: TourReservationsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "month">("week")

  // Generar reservaciones de ejemplo si no hay datos
  const mockReservations: TourReservation[] = useMemo(() => {
    if (reservations.length > 0) return reservations

    const now = new Date()
    const mockData: TourReservation[] = []

    tours.forEach((tour) => {
      const totalBookings = (tour.paidBookings || 0) + (tour.pendingBookings || 0) + (tour.acceptedUnpaidBookings || 0)
      
      // Pagadas
      for (let i = 0; i < (tour.paidBookings || 0); i++) {
        const date = new Date(now)
        date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1)
        mockData.push({
          tourId: tour.id,
          tourTitle: tour.title,
          date: date.toISOString().split("T")[0],
          time: `${9 + Math.floor(Math.random() * 8)}:00`,
          participants: Math.floor(Math.random() * 6) + 1,
          status: "pagada",
          clientName: `Cliente Pagado ${i + 1}`,
        })
      }

      // Pendientes
      for (let i = 0; i < (tour.pendingBookings || 0); i++) {
        const date = new Date(now)
        date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1)
        mockData.push({
          tourId: tour.id,
          tourTitle: tour.title,
          date: date.toISOString().split("T")[0],
          time: `${9 + Math.floor(Math.random() * 8)}:00`,
          participants: Math.floor(Math.random() * 6) + 1,
          status: "pendiente",
          clientName: `Cliente Pendiente ${i + 1}`,
        })
      }

      // Aceptadas sin pago
      for (let i = 0; i < (tour.acceptedUnpaidBookings || 0); i++) {
        const date = new Date(now)
        date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1)
        mockData.push({
          tourId: tour.id,
          tourTitle: tour.title,
          date: date.toISOString().split("T")[0],
          time: `${9 + Math.floor(Math.random() * 8)}:00`,
          participants: Math.floor(Math.random() * 6) + 1,
          status: "aceptada_sin_pago",
          clientName: `Cliente Aceptado ${i + 1}`,
        })
      }
    })

    return mockData
  }, [tours, reservations])

  // Obtener días del mes/semana
  const getDaysInWeek = (date: Date): Date[] => {
    const curr = new Date(date)
    const first = curr.getDate() - curr.getDay()
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr.setDate(first + i))
      days.push(new Date(day))
    }
    return days
  }

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    const days = []
    const firstDayOfWeek = firstDay.getDay()

    // Días del mes anterior
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i))
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    // Días del mes siguiente
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }

    return days
  }

  const days = viewMode === "week" ? getDaysInWeek(currentDate) : getDaysInMonth(currentDate)

  const getReservationsForDate = (date: Date): TourReservation[] => {
    const dateStr = date.toISOString().split("T")[0]
    return mockReservations.filter((res) => res.date === dateStr)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pagada":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "aceptada_sin_pago":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pagada":
        return "Pagada"
      case "pendiente":
        return "Pendiente"
      case "aceptada_sin_pago":
        return "Aceptada (sin pago)"
      default:
        return status
    }
  }

  const goToPreviousPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const goToNextPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const monthYear = currentDate.toLocaleString("es-ES", { month: "long", year: "numeric" })

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <CardTitle>Calendario de Reservas</CardTitle>
          </div>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "week" | "month")}>
            <TabsList>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controles de navegación */}
        <div className="flex items-center justify-between gap-2">
          <Button variant="outline" size="sm" onClick={goToPreviousPeriod}>
            <ChevronLeftIcon />
          </Button>
          <div className="text-center">
            <p className="font-semibold capitalize">{monthYear}</p>
            <p className="text-xs text-muted-foreground">
              {viewMode === "week"
                ? `${days[0].getDate()} - ${days[6].getDate()} de ${days[0].toLocaleString("es-ES", { month: "short" })}`
                : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextPeriod}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* Vista de semana */}
        {viewMode === "week" && (
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const reservations = getReservationsForDate(day)
              const isToday =
                day.toDateString() === new Date().toDateString()
              const isCurrentMonth = day.getMonth() === currentDate.getMonth()

              return (
                <div
                  key={idx}
                  className={`flex flex-col gap-2 p-3 rounded-lg border min-h-32 ${
                    isToday
                      ? "bg-primary/10 border-primary"
                      : isCurrentMonth
                        ? "bg-background"
                        : "bg-muted/30"
                  }`}
                >
                  <div className="text-sm font-semibold">
                    <p className="text-xs text-muted-foreground">
                      {day.toLocaleString("es-ES", { weekday: "short" })}
                    </p>
                    <p className={isToday ? "text-primary" : ""}>{day.getDate()}</p>
                  </div>
                  <div className="space-y-1 flex-1">
                    {reservations.length > 0 ? (
                      reservations.map((res, i) => (
                        <div key={i} className="text-xs bg-card p-1 rounded border">
                          <p className="font-medium truncate">{res.tourTitle}</p>
                          <p className="text-muted-foreground">{res.time}</p>
                          <Badge className={`mt-1 text-xs ${getStatusColor(res.status)}`}>
                            {getStatusLabel(res.status)}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">Sin reservas</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Vista de mes */}
        {viewMode === "month" && (
          <div className="space-y-2">
            {/* Encabezado de días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Grilla de días */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                const reservations = getReservationsForDate(day)
                const isToday = day.toDateString() === new Date().toDateString()
                const isCurrentMonth = day.getMonth() === currentDate.getMonth()

                return (
                  <div
                    key={idx}
                    className={`flex flex-col gap-1 p-2 rounded border min-h-24 text-xs ${
                      isToday
                        ? "bg-primary/10 border-primary"
                        : isCurrentMonth
                          ? "bg-background"
                          : "bg-muted/30"
                    }`}
                  >
                    <p
                      className={`font-semibold ${isToday ? "text-primary" : ""} ${!isCurrentMonth ? "text-muted-foreground" : ""}`}
                    >
                      {day.getDate()}
                    </p>
                    <div className="space-y-1 flex-1 overflow-y-auto">
                      {reservations.slice(0, 2).map((res, i) => (
                        <div
                          key={i}
                          className={`px-1 py-0.5 rounded text-xs font-medium truncate text-white ${
                            res.status === "pagada"
                              ? "bg-green-600"
                              : res.status === "pendiente"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          }`}
                        >
                          {res.tourTitle}
                        </div>
                      ))}
                      {reservations.length > 2 && (
                        <p className="text-muted-foreground font-medium">
                          +{reservations.length - 2} más
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 pt-4 border-t text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span>Pagada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-600" />
            <span>Pendiente de pago</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span>Aceptada (sin pago)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
