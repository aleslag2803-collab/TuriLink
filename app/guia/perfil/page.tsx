"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Camera, Save, MapPin, Mail, Phone, Globe, Star, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GuideProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    pais: user?.pais || "",
    ciudad: user?.ciudad || "",
    descripcion: user?.descripcion || "",
    idiomas: ["Español", "Inglés"],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados exitosamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mi Perfil de Guía</h1>
        <p className="text-muted-foreground">Gestiona tu perfil profesional y credenciales</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-4xl">{user?.nombre.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-2xl font-bold">{user?.calificacion || "5.0"}</span>
              </div>
              <p className="text-sm text-muted-foreground">234 reseñas</p>
            </div>
            <Badge className="bg-accent text-accent-foreground">
              <Award className="w-3 h-3 mr-1" />
              Guía Verificado
            </Badge>
            <Button variant="outline" className="w-full bg-transparent">
              <Camera className="w-4 h-4 mr-2" />
              Cambiar Foto
            </Button>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tus datos profesionales</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="pais" name="pais" value={formData.pais} onChange={handleChange} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ciudad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción Profesional</Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Cuéntales a los turistas sobre tu experiencia como guía..."
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Languages & Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Idiomas y Especialidades</CardTitle>
          <CardDescription>Destaca tus habilidades y áreas de expertise</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Idiomas que hablas</Label>
            <div className="flex flex-wrap gap-2">
              {formData.idiomas.map((idioma) => (
                <Badge key={idioma} variant="secondary" className="text-sm px-3 py-1">
                  {idioma}
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                + Agregar idioma
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Especialidades</Label>
            <div className="flex flex-wrap gap-2">
              {["Historia", "Gastronomía", "Arte", "Arquitectura"].map((specialty) => (
                <Badge key={specialty} className="text-sm px-3 py-1 bg-primary">
                  {specialty}
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                + Agregar especialidad
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
