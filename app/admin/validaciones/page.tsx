"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileCheck, FileX, Eye, Download } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function ValidacionesPage() {
  const { toast } = useToast()
  const [validaciones, setValidaciones] = useState([
    {
      id: 1,
      guia: "Carlos Mendoza",
      email: "carlos@email.com",
      documentos: {
        ine: { estado: "pendiente", url: "/docs/ine-carlos.pdf" },
        antecedentes: { estado: "pendiente", url: "/docs/antecedentes-carlos.pdf" },
        certificado: { estado: "aprobado", url: "/docs/cert-carlos.pdf" },
      },
      fechaSolicitud: "2024-01-15",
    },
    {
      id: 2,
      guia: "María García",
      email: "maria@email.com",
      documentos: {
        ine: { estado: "aprobado", url: "/docs/ine-maria.pdf" },
        antecedentes: { estado: "pendiente", url: "/docs/antecedentes-maria.pdf" },
        certificado: { estado: "pendiente", url: "/docs/cert-maria.pdf" },
      },
      fechaSolicitud: "2024-01-14",
    },
  ])

  const handleAprobar = (id: number, documento: string) => {
    toast({
      title: "Documento aprobado",
      description: "El documento ha sido verificado y aprobado",
    })
  }

  const handleRechazar = (id: number, documento: string) => {
    toast({
      title: "Documento rechazado",
      description: "Se ha notificado al guía para que suba un nuevo documento",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Validación de Documentos</h2>
        <p className="text-muted-foreground">Revisa y aprueba documentos de guías</p>
      </div>

      <div className="space-y-4">
        {validaciones.map((validacion) => (
          <Card key={validacion.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{validacion.guia}</CardTitle>
                  <CardDescription>{validacion.email}</CardDescription>
                </div>
                <Badge variant="secondary">Solicitud: {validacion.fechaSolicitud}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(validacion.documentos).map(([tipo, doc]) => (
                  <div key={tipo} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium capitalize">
                        {tipo === "ine"
                          ? "INE / Identificación"
                          : tipo === "antecedentes"
                            ? "Antecedentes No Penales"
                            : "Certificado de Guía"}
                      </p>
                      <Badge
                        variant={
                          doc.estado === "aprobado"
                            ? "default"
                            : doc.estado === "rechazado"
                              ? "destructive"
                              : "secondary"
                        }
                        className="mt-2"
                      >
                        {doc.estado}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                      {doc.estado === "pendiente" && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleAprobar(validacion.id, tipo)}
                          >
                            <FileCheck className="w-4 h-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRechazar(validacion.id, tipo)}
                          >
                            <FileX className="w-4 h-4 mr-1" />
                            Rechazar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
