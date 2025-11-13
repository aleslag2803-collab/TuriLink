"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react"

export default function PagosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Control de Pagos</h1>
          <p className="text-muted-foreground">Administra tus ingresos y solicita retiros</p>
        </div>
        <Button>
          <DollarSign className="w-4 h-4 mr-2" />
          Solicitar Retiro
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance Disponible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-eco">$4,890</div>
            <p className="text-sm text-muted-foreground mt-1">Listo para retirar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-vibrant">$1,250</div>
            <p className="text-sm text-muted-foreground mt-1">En proceso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total del Año</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$45,780</div>
            <p className="text-sm text-muted-foreground mt-1">2025</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-eco">
              <TrendingUp className="w-4 h-4" />
              <span>+24% vs 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Historial de Pagos</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, date: "15 Enero 2025", amount: 3200, status: "completed", method: "Transferencia" },
              { id: 2, date: "30 Diciembre 2024", amount: 4150, status: "completed", method: "Transferencia" },
              { id: 3, date: "15 Diciembre 2024", amount: 2890, status: "completed", method: "Transferencia" },
              { id: 4, date: "05 Diciembre 2024", amount: 1250, status: "pending", method: "Transferencia" },
              { id: 5, date: "28 Noviembre 2024", amount: 3670, status: "completed", method: "Transferencia" },
            ].map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-4 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{payment.date}</div>
                    <div className="text-sm text-muted-foreground">{payment.method}</div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="text-lg font-semibold">${payment.amount.toLocaleString()}</div>
                    <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="mt-1">
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
