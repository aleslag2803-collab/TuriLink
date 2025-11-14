"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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

export default function TouristProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    pais: user?.pais || "",
    ciudad: user?.ciudad || "",
    bio: "",
  })

  // preview de la imagen seleccionada (si existe, usar avatar del usuario como inicial)
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar || undefined)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // limpiar blob URL anterior cuando cambie preview
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // limpiar previa si era blob
    setAvatarPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    // aquí podrías guardar el file para subirlo al backend más tarde si lo deseas
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
        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={avatarPreview || "/placeholder.svg"} />
              <AvatarFallback className="text-4xl">{(user?.nombre || "U").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            {/* input file oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="text-center">
              <Badge className="bg-accent text-accent-foreground gap-1">
                <Award className="w-3 h-3" />
                Nivel Gold
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">850 puntos viajero</p>
            </div>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-4 h-4 mr-2" />
              Cambiar Foto
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tus datos personales</CardDescription>
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
                <Label htmlFor="bio">Sobre mí</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Cuéntanos sobre tus intereses de viaje..."
                  value={formData.bio}
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

      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Viaje</CardTitle>
          <CardDescription>Personaliza tu experiencia en TuriLink</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Intereses</Label>
            <div className="flex flex-wrap gap-2">
              {["Historia", "Gastronomía", "Arte", "Aventura", "Naturaleza", "Fotografía", "Cultura"].map(
                (interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {interest}
                  </Badge>
                ),
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Idiomas</Label>
            <div className="flex flex-wrap gap-2">
              {["Español", "Inglés"].map((lang) => (
                <Badge key={lang} className="bg-primary">
                  {lang}
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                + Agregar idioma
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Viajero</CardTitle>
          <CardDescription>Tu actividad en TuriLink</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Tours Completados</div>
              <div className="text-3xl font-bold">12</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Ciudades Visitadas</div>
              <div className="text-3xl font-bold">5</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Guías Conocidos</div>
              <div className="text-3xl font-bold">8</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Reseñas Escritas</div>
              <div className="text-3xl font-bold flex items-center gap-2">
                10
                <Star className="w-5 h-5 text-accent fill-accent" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
