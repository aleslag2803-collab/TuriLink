"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, UserCheck, UserX, Mail, Phone, MapPin } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UsuariosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState("todos")

  const usuarios = [
    {
      id: 1,
      nombre: "Carlos Mendoza",
      email: "carlos@email.com",
      tipo: "guia",
      telefono: "+52 123 456 7890",
      ciudad: "Cancún",
      estado: "activo",
      fechaRegistro: "2024-01-10",
    },
    {
      id: 2,
      nombre: "María García",
      email: "maria@email.com",
      tipo: "turista",
      telefono: "+52 098 765 4321",
      ciudad: "CDMX",
      estado: "activo",
      fechaRegistro: "2024-01-12",
    },
    {
      id: 3,
      nombre: "Juan Pérez",
      email: "juan@email.com",
      tipo: "guia",
      telefono: "+52 555 123 4567",
      ciudad: "Guadalajara",
      estado: "suspendido",
      fechaRegistro: "2024-01-08",
    },
  ]

  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTipo = tipoFiltro === "todos" || usuario.tipo === tipoFiltro
    return matchesSearch && matchesTipo
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
        <p className="text-muted-foreground">Administra usuarios de la plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos los Usuarios</CardTitle>
          <CardDescription>Lista completa de turistas y guías registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="turista">Turistas</SelectItem>
                <SelectItem value="guia">Guías</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{usuario.nombre}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {usuario.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={usuario.tipo === "guia" ? "default" : "secondary"}>
                        {usuario.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {usuario.telefono}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {usuario.ciudad}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={usuario.estado === "activo" ? "default" : "destructive"}>
                        {usuario.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {usuario.estado === "activo" ? (
                          <Button size="sm" variant="outline">
                            <UserX className="w-4 h-4 mr-1" />
                            Suspender
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <UserCheck className="w-4 h-4 mr-1" />
                            Activar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
