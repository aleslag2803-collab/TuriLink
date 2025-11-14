"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PagosPage() {
  const [withdrawalStatus, setWithdrawalStatus] = useState<"idle" | "processing" | "completed">("idle")

  const tourIncomeData = [
    {
      id: 1,
      name: "Zona Hotelera: Mirador & Playa Delfines",
      totalEarnings: 4200,
      commission: 126,
      netIncome: 4074,
      bookings: 6,
      status: "active",
    },
    {
      id: 2,
      name: "Noche en Coco Bongo Cancún",
      totalEarnings: 3800,
      commission: 114,
      netIncome: 3686,
      bookings: 5,
      status: "active",
    },
    {
      id: 3,
      name: "Hard Rock Café & Bares Zona Hotelera",
      totalEarnings: 3200,
      commission: 96,
      netIncome: 3104,
      bookings: 4,
      status: "active",
    },
    {
      id: 4,
      name: "Isla Mujeres en Catamarán",
      totalEarnings: 2900,
      commission: 87,
      netIncome: 2813,
      bookings: 3,
      status: "completed",
    },
    {
      id: 5,
      name: "Chichén Itzá Express desde Cancún",
      totalEarnings: 2600,
      commission: 78,
      netIncome: 2522,
      bookings: 2,
      status: "completed",
    },
  ]

  const totalStats = {
    totalEarnings: tourIncomeData.reduce((sum, tour) => sum + tour.totalEarnings, 0),
    totalCommission: tourIncomeData.reduce((sum, tour) => sum + tour.commission, 0),
    totalNetIncome: tourIncomeData.reduce((sum, tour) => sum + tour.netIncome, 0),
    totalBookings: tourIncomeData.reduce((sum, tour) => sum + tour.bookings, 0),
  }

  // Pendiente por pagar al guía
  const pendingAmount = 2500
  // Balance disponible = ganancia neta - pendiente
  const availableBalance = totalStats.totalNetIncome - pendingAmount
  // Total del año = ingresos totales de todos los tours
  const totalYear = totalStats.totalEarnings

  const handleRequestWithdrawal = async () => {
    setWithdrawalStatus("processing")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setWithdrawalStatus("completed")
    setTimeout(() => setWithdrawalStatus("idle"), 5000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Control de Pagos</h1>
          <p className="text-muted-foreground">Administra tus ingresos y solicita retiros</p>
        </div>
      </div>

      {/* Resumen superior */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance Disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-eco">
              ${availableBalance.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Listo para retirar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-vibrant">
              ${pendingAmount.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">En proceso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total del Año</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${totalYear.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">2025</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-eco">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4" />
              </svg>
              <span>+24% vs 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métodos de pago y facturación */}
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
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h10M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
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
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
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

      {/* Retiro de efectivo + desglose */}
      <Card className="border-2 border-green-eco/30 bg-green-eco/5">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Retiro de Efectivo</CardTitle>
          <CardDescription>Solicita tu retiro y recibirás una confirmación en tu correo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Desglose de ingresos */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Desglose de Ingresos por Tour</h3>

              {/* Estadísticas resumen */}
              <div className="grid md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/50 border">
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-1">TOTAL INGRESOS</div>
                  <div className="text-2xl font-bold">
                    ${totalStats.totalEarnings.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-1">COMISIONES</div>
                  <div className="text-2xl font-bold text-orange-vibrant">
                    ${totalStats.totalCommission.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-1">GANANCIA NETA</div>
                  <div className="text-2xl font-bold text-green-eco">
                    ${totalStats.totalNetIncome.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-1">TOTAL RESERVAS</div>
                  <div className="text-2xl font-bold">{totalStats.totalBookings}</div>
                </div>
              </div>

              {/* Tabla de tours */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm">Tour / Experiencia</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Ingresos</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Comisión</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Ganancia Neta</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">Reservas</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourIncomeData.map((tour) => (
                      <tr
                        key={tour.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium text-sm">{tour.name}</td>
                        <td className="text-right py-4 px-4 font-semibold">
                          ${tour.totalEarnings.toLocaleString()}
                        </td>
                        <td className="text-right py-4 px-4 text-orange-vibrant font-semibold">
                          -${tour.commission.toLocaleString()}
                        </td>
                        <td className="text-right py-4 px-4 text-green-eco font-semibold">
                          ${tour.netIncome.toLocaleString()}
                        </td>
                        <td className="text-right py-4 px-4">{tour.bookings}</td>
                        <td className="text-center py-4 px-4">
                          <Badge variant={tour.status === "active" ? "default" : "secondary"}>
                            {tour.status === "active" ? "Activo" : "Completado"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t"></div>

            {/* Botón de retiro */}
            <div className="flex flex-col gap-4">
              <Button
                onClick={handleRequestWithdrawal}
                disabled={withdrawalStatus === "processing"}
                className="w-full md:w-auto"
                size="lg"
              >
                {withdrawalStatus === "idle" && (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Retiro de Efectivo
                  </>
                )}
                {withdrawalStatus === "processing" && (
                  <>
                    <svg
                      className="w-4 h-4 mr-2 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Procesando Retiro...
                  </>
                )}
                {withdrawalStatus === "completed" && (
                  <>
                    <svg
                      className="w-4 h-4 mr-2 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Retiro Solicitado
                  </>
                )}
              </Button>

              {withdrawalStatus === "processing" && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Se está procesando tu retiro.</span> Te notificaremos en tu correo{" "}
                    <span className="font-medium">guia@example.com</span> cuando se realice la transacción.
                  </p>
                </div>
              )}

              {withdrawalStatus === "completed" && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-900">
                    <span className="font-semibold">Retiro solicitado exitosamente.</span> Te hemos enviado una
                    confirmación a <span className="font-medium">guia@example.com</span>. El dinero llegará a tu cuenta
                    en 1-2 días hábiles.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial de pagos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Historial de Pagos</CardTitle>
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, date: "15 Enero 2025", amount: 2200, status: "completed", method: "Transferencia" },
              { id: 2, date: "30 Diciembre 2024", amount: 2150, status: "completed", method: "Transferencia" },
              { id: 3, date: "15 Diciembre 2024", amount: 1890, status: "completed", method: "Transferencia" },
              { id: 4, date: "05 Diciembre 2024", amount: 950, status: "pending", method: "Transferencia" },
              { id: 5, date: "28 Noviembre 2024", amount: 1670, status: "completed", method: "Transferencia" },
            ].map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between py-4 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">{payment.date}</div>
                    <div className="text-sm text-muted-foreground">{payment.method}</div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="text-lg font-semibold">
                      ${payment.amount.toLocaleString()}
                    </div>
                    <Badge
                      variant={payment.status === "completed" ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {payment.status === "completed" ? "Completado" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
