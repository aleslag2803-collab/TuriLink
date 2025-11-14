"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ReportesPage() {
  const { toast } = useToast()
  const [filtroEstado, setFiltroEstado] = useState("todos")

  const [reportes, setReportes] = useState([
    {
      id: 1,
      tipo: "Contenido Inapropiado",
      reportadoPor: "Usuario123",
      reportado: "Guia456",
      descripcion: "El tour contiene información ofensiva",
      fecha: "2024-01-15",
      estado: "pendiente",
    },
    {
      id: 2,
      tipo: "Fraude",
      reportadoPor: "Usuario789",
      reportado: "Guia321",
      descripcion: "El guía no apareció en el tour pagado",
      fecha: "2024-01-14",
      estado: "revisando",
    },
    {
      id: 3,
      tipo: "Spam",
      reportadoPor: "Usuario456",
      reportado: "Guia654",
      descripcion: "Publicación masiva de tours duplicados",
      fecha: "2024-01-13",
      estado: "resuelto",
    },
  ])

  const filteredReportes = reportes.filter(
    (reporte) => filtroEstado === "todos" || reporte.estado === filtroEstado
  )

  const handleCambiarEstado = (id: number, nuevoEstado: string) => {
    setReportes(
      reportes.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r))
    )
    toast({
      title: "Estado actualizado",
      description: `El reporte ha sido marcado como ${nuevoEstado}`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reportes y Denuncias</h2>
        <p className="text-muted-foreground">Gestiona reportes de usuarios</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Reportes</CardTitle>
              <CardDescription>Revisa y resuelve reportes de la comunidad</CardDescription>
            </div>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="revisando">En revisión</SelectItem>
                <SelectItem value="resuelto">Resueltos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReportes.map((reporte) => (
              <Card key={reporte.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <h3 className="font-semibold text-lg">{reporte.tipo}</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-muted-foreground">Reportado por:</span>{" "}
                          <span className="font-medium">{reporte.reportadoPor}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Usuario reportado:</span>{" "}
                          <span className="font-medium">{reporte.reportado}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Descripción:</span> {reporte.descripcion}
                        </p>
                        <p className="text-muted-foreground">Fecha: {reporte.fecha}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <Badge
                        variant={
                          reporte.estado === "pendiente"
                            ? "destructive"
                            : reporte.estado === "revisando"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {reporte.estado === "pendiente" && <Clock className="w-3 h-3 mr-1" />}
                        {reporte.estado === "resuelto" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {reporte.estado}
                      </Badge>
                      {reporte.estado !== "resuelto" && (
                        <div className="flex flex-col gap-2">
                          {reporte.estado === "pendiente" && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleCambiarEstado(reporte.id, "revisando")}
                            >
                              Revisar
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleCambiarEstado(reporte.id, "resuelto")}
                          >
                            Resolver
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
