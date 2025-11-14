"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Users, CreditCard, Lock, CheckCircle2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

type Reservation = {
  id: number
  tour: any
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  personas: string
  comentarios: string
  fecha_reserva: string
  estado: "pendiente" | "confirmada"
  total: number
}

export default function PagoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reservaId = searchParams.get("reserva")
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (reservaId) {
      try {
        const pending = JSON.parse(localStorage.getItem("turilink_pending_reservations") || "[]")
        const found = pending.find((r: Reservation) => r.id === parseInt(reservaId))
        if (found) {
          setReservation(found)
        }
      } catch (e) {
        console.error("Error loading reservation", e)
      }
    }
  }, [reservaId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      if (reservation) {
        try {
          // Remove from pending
          const pending = JSON.parse(localStorage.getItem("turilink_pending_reservations") || "[]")
          const updated = pending.filter((r: Reservation) => r.id !== reservation.id)
          localStorage.setItem("turilink_pending_reservations", JSON.stringify(updated))

          // Add to confirmed
          const confirmed = JSON.parse(localStorage.getItem("turilink_confirmed_reservations") || "[]")
          const confirmedReservation = {
            ...reservation,
            estado: "confirmada",
            fecha_pago: new Date().toISOString(),
          }
          confirmed.push(confirmedReservation)
          localStorage.setItem("turilink_confirmed_reservations", JSON.stringify(confirmed))

          setIsProcessing(false)
          setIsComplete(true)
        } catch (e) {
          console.error("Error processing payment", e)
          setIsProcessing(false)
        }
      }
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">¡Pago Exitoso!</CardTitle>
            <CardDescription>Tu reserva ha sido confirmada. Hemos enviado los detalles a tu correo electrónico.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg text-left">
              <h3 className="font-semibold mb-2">{reservation?.tour?.title}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {reservation?.fecha}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {reservation?.hora}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {reservation?.personas} {reservation?.personas === "1" ? "persona" : "personas"}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link href="/turista/reservas">Ver Mis Reservas</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/turista/dashboard">Explorar Más Tours</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!reservation) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Reserva no encontrada</CardTitle>
            <CardDescription>No pudimos encontrar la reserva solicitada</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/turista/reservas">Ver Mis Reservas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Confirmar y Pagar</h1>
        <p className="text-muted-foreground">Completa tu pago para confirmar la reserva</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Reservation Summary */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Resumen de Reserva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-40 rounded-lg overflow-hidden">
              <Image src={reservation.tour?.image || "/placeholder.svg"} alt={reservation.tour?.title} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{reservation.tour?.title}</h3>
              <Badge variant="secondary" className="mb-3 bg-amber-100 text-amber-800">
                Pendiente de Pago
              </Badge>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{reservation.fecha}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{reservation.hora}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    {reservation.personas} {reservation.personas === "1" ? "persona" : "personas"}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${reservation.total.toLocaleString()} MXN</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Impuestos</span>
                <span>Incluidos</span>
              </div>
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">${reservation.total.toLocaleString()} MXN</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información de Pago</CardTitle>
            <CardDescription>Ingresa los datos de tu tarjeta de forma segura</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                <Lock className="w-4 h-4" />
                <span>Tu información está protegida con encriptación SSL de 256 bits</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    required
                    value={paymentData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "")
                      if (value.length <= 16 && /^\d*$/.test(value)) {
                        setPaymentData({ ...paymentData, cardNumber: value.replace(/(\d{4})/g, "$1 ").trim() })
                      }
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                <Input
                  id="cardName"
                  required
                  value={paymentData.cardName}
                  onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                  placeholder="JUAN PEREZ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
                  <Input
                    id="expiryDate"
                    required
                    value={paymentData.expiryDate}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      if (value.length <= 4) {
                        const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value
                        setPaymentData({ ...paymentData, expiryDate: formatted })
                      }
                    }}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    required
                    value={paymentData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      if (value.length <= 4) {
                        setPaymentData({ ...paymentData, cvv: value })
                      }
                    }}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 gap-2" disabled={isProcessing}>
                    {isProcessing ? (
                      <>Procesando...</>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Pagar ${reservation.total.toLocaleString()} MXN
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild disabled={isProcessing}>
                    <Link href="/turista/reservas">Cancelar</Link>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
