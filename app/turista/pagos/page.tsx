"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Calendar } from "lucide-react"

export default function PagosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Métodos de Pago</h1>
        <p className="text-muted-foreground">Gestiona tus tarjetas y revisa tu historial</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tarjetas Guardadas</CardTitle>
            <CardDescription>Gestiona tus métodos de pago</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Visa •••• 4242</div>
                  <div className="text-sm text-muted-foreground">Expira 12/26</div>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                Editar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-dashed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Agregar Nueva Tarjeta</div>
                  <div className="text-sm text-muted-foreground">Visa, Mastercard, AmEx</div>
                </div>
              </div>
              <Button size="sm">Agregar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de Facturación</CardTitle>
            <CardDescription>Tus datos para recibos fiscales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Nombre</div>
              <div className="font-medium">Juan Pérez</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">RFC</div>
              <div className="font-medium">XAXX010101000</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Dirección</div>
              <div className="font-medium">Av. Reforma 123, CDMX</div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Actualizar Información
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>Últimas transacciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 1,
                description: "Tour Histórico Centro",
                amount: "$350 MXN",
                date: "15 Enero 2025",
                status: "Completado",
              },
              {
                id: 2,
                description: "Gastronomía Coyoacán",
                amount: "$1,500 MXN",
                date: "10 Enero 2025",
                status: "Completado",
              },
              {
                id: 3,
                description: "Xochimilco y Coyoacán",
                amount: "$600 MXN",
                date: "5 Enero 2025",
                status: "Completado",
              },
              {
                id: 4,
                description: "Museo Frida Kahlo",
                amount: "$450 MXN",
                date: "28 Diciembre 2024",
                status: "Completado",
              },
            ].map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-4 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{payment.description}</div>
                    <div className="text-sm text-muted-foreground">{payment.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{payment.amount}</div>
                  <div className="text-xs text-green-eco">{payment.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
