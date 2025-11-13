"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard, CheckCircle2, Shield, AlertCircle } from "lucide-react"

export default function PaymentsPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Pagos Seguros</h1>
        <p className="text-lg text-muted-foreground">Contrata a tu guía de forma rápida y segura</p>
      </div>

      {showSuccess && (
        <Card className="p-6 bg-primary/5 border-primary">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-card-foreground">¡Pago simulado exitoso!</p>
              <p className="text-sm text-muted-foreground">
                Tu reserva ha sido confirmada. Recibirás un correo con los detalles.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Método de Pago</h2>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                <Input id="cardName" placeholder="Juan Pérez" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de tarjeta</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Fecha de expiración</Label>
                  <Input id="expiry" placeholder="MM/AA" maxLength={5} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" maxLength={3} type="password" required />
                </div>
              </div>

              <Card className="p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground mb-1">Pago Simulado</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Este es un pago de demostración. No se realizarán cargos reales a tu tarjeta. En producción,
                      integraremos Stripe/PayPal/Mercado Pago.
                    </p>
                  </div>
                </div>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Realizar Pago Simulado
              </Button>
            </form>
          </Card>

          {/* Payment Methods */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Métodos de pago disponibles</h3>
            <div className="flex flex-wrap gap-4">
              <Badge variant="outline" className="text-sm py-2 px-4">
                💳 Tarjeta de Crédito
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                💳 Tarjeta de Débito
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                💰 PayPal
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                🏪 Mercado Pago
              </Badge>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-card-foreground mb-6">Resumen de Reserva</h2>

            {/* Guide Info */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <Avatar className="w-14 h-14">
                <AvatarImage src="/guia-turistico.jpg" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-card-foreground">Carlos Méndez</p>
                <p className="text-sm text-muted-foreground">Cultura & Historia</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tour de 4 horas</span>
                <span className="font-medium text-card-foreground">$180 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Comisión de servicio</span>
                <span className="font-medium text-card-foreground">$20 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Seguro de viaje</span>
                <span className="font-medium text-card-foreground">$10 USD</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-card-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">$210 USD</span>
              </div>
            </div>

            {/* Security Info */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground mb-1">Pago 100% Seguro</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tus datos están protegidos con encriptación SSL de nivel bancario
                  </p>
                </div>
              </div>
            </Card>
          </Card>

          {/* Cancellation Policy */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-card-foreground mb-3">Política de Cancelación</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Cancelación gratuita hasta 24h antes del tour</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Reembolso completo si el guía cancela</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Soporte 24/7 disponible</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
