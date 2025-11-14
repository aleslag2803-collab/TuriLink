"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, MapPin, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const stats = [
    { title: "Total Usuarios", value: "1,234", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Guías Activos", value: "456", change: "+8%", icon: UserCheck, color: "text-green-600" },
    { title: "Tours Publicados", value: "789", change: "+15%", icon: MapPin, color: "text-orange-600" },
    { title: "Ingresos Total", value: "$45,678", change: "+23%", icon: DollarSign, color: "text-emerald-600" },
  ]

  const pendingValidations = [
    { id: 1, guia: "Carlos Mendoza", documento: "INE", fecha: "2024-01-15" },
    { id: 2, guia: "María García", documento: "Certificado Guía", fecha: "2024-01-14" },
    { id: 3, guia: "Juan Pérez", documento: "Antecedentes", fecha: "2024-01-13" },
  ]

  const recentReports = [
    { id: 1, tipo: "Contenido Inapropiado", usuario: "Usuario123", fecha: "2024-01-15", estado: "pendiente" },
    { id: 2, tipo: "Fraude", usuario: "Guia456", fecha: "2024-01-14", estado: "revisando" },
    { id: 3, tipo: "Spam", usuario: "Usuario789", fecha: "2024-01-13", estado: "resuelto" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Resumen general de la plataforma TuriLink</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                  {stat.change} desde el mes pasado
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Validations */}
        <Card>
          <CardHeader>
            <CardTitle>Validaciones Pendientes</CardTitle>
            <CardDescription>Documentos de guías esperando aprobación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingValidations.map((validation) => (
                <div key={validation.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{validation.guia}</p>
                    <p className="text-sm text-muted-foreground">{validation.documento}</p>
                    <p className="text-xs text-muted-foreground mt-1">{validation.fecha}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Revisar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Reportes Recientes</CardTitle>
            <CardDescription>Últimos reportes de usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="font-medium">{report.tipo}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.usuario}</p>
                    <p className="text-xs text-muted-foreground mt-1">{report.fecha}</p>
                  </div>
                  <Badge
                    variant={
                      report.estado === "pendiente"
                        ? "destructive"
                        : report.estado === "revisando"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {report.estado}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
