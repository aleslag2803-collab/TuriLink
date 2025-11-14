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

  // preview de la imagen seleccionada y ref al input oculto
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar || undefined)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // limpiar blob URL al desmontar
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    // aquí podrías almacenar el file para subirlo al servidor más tarde
  }

  // Documentos personales (previews y refs)
  type DocMeta = { url: string; name: string; type: string }
  const [docs, setDocs] = useState<Partial<Record<"ineFront" | "ineBack" | "sat" | "noPenal" | "certificado", DocMeta>>>({})
  const ineFrontRef = useRef<HTMLInputElement | null>(null)
  const ineBackRef = useRef<HTMLInputElement | null>(null)
  const satRef = useRef<HTMLInputElement | null>(null)
  const noPenalRef = useRef<HTMLInputElement | null>(null)
  const certRef = useRef<HTMLInputElement | null>(null)

  function handleDocChange(field: keyof typeof docs, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setDocs((prev) => {
      const prevUrl = prev[field]?.url
      if (prevUrl && prevUrl.startsWith("blob:")) URL.revokeObjectURL(prevUrl)
      const url = URL.createObjectURL(file)
      return { ...prev, [field]: { url, name: file.name, type: file.type } }
    })
  }

  function removeDoc(field: keyof typeof docs) {
    setDocs((prev) => {
      const next = { ...prev }
      const prevUrl = next[field]?.url
      if (prevUrl && prevUrl.startsWith("blob:")) URL.revokeObjectURL(prevUrl)
      delete next[field]
      return next
    })
  }

  useEffect(() => {
    return () => {
      // limpiar todos los blob URLs al desmontar
      Object.values(docs).forEach((d) => {
        if (d?.url && d.url.startsWith("blob:")) URL.revokeObjectURL(d.url)
      })
    }
  }, [docs])

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
            {/* preview/avatar */}
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

      {/* Documentos Personales */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Personales</CardTitle>
          <CardDescription>Sube tus documentos oficiales (INE, SAT, Constancia No Penal, Certificado)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* INE (anverso / reverso) */}
          <div>
            <h4 className="font-semibold mb-2">INE (Anverso / Reverso)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => ineFrontRef.current?.click()}>Subir Anverso</Button>
                  <Button size="sm" variant="ghost" onClick={() => removeDoc("ineFront")}>Eliminar</Button>
                </div>
                <input ref={ineFrontRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleDocChange("ineFront", e)} />
                <div className="rounded-md overflow-hidden border p-2 bg-muted">
                  {docs.ineFront ? (
                    docs.ineFront.type.startsWith("image/") ? (
                      <img src={docs.ineFront.url} alt={docs.ineFront.name} className="w-full h-56 object-contain" />
                    ) : (
                      <object data={docs.ineFront.url} type={docs.ineFront.type} className="w-full h-56">
                        <a href={docs.ineFront.url} target="_blank" rel="noreferrer">Ver {docs.ineFront.name}</a>
                      </object>
                    )
                  ) : (
                    <div className="text-sm text-muted-foreground">No hay anverso cargado</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => ineBackRef.current?.click()}>Subir Reverso</Button>
                  <Button size="sm" variant="ghost" onClick={() => removeDoc("ineBack")}>Eliminar</Button>
                </div>
                <input ref={ineBackRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleDocChange("ineBack", e)} />
                <div className="rounded-md overflow-hidden border p-2 bg-muted">
                  {docs.ineBack ? (
                    docs.ineBack.type.startsWith("image/") ? (
                      <img src={docs.ineBack.url} alt={docs.ineBack.name} className="w-full h-56 object-contain" />
                    ) : (
                      <object data={docs.ineBack.url} type={docs.ineBack.type} className="w-full h-56">
                        <a href={docs.ineBack.url} target="_blank" rel="noreferrer">Ver {docs.ineBack.name}</a>
                      </object>
                    )
                  ) : (
                    <div className="text-sm text-muted-foreground">No hay reverso cargado</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SAT */}
          <div>
            <h4 className="font-semibold mb-2">SAT (Constancia de Situación Fiscal)</h4>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Button size="sm" onClick={() => satRef.current?.click()}>Subir SAT</Button>
                  <Button size="sm" variant="ghost" onClick={() => removeDoc("sat")}>Eliminar</Button>
                </div>
                <input ref={satRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleDocChange("sat", e)} />
                <div className="rounded-md overflow-hidden border p-2 bg-muted">
                  {docs.sat ? (
                    docs.sat.type.startsWith("image/") ? (
                      <img src={docs.sat.url} alt={docs.sat.name} className="w-full h-56 object-contain" />
                    ) : (
                      <object data={docs.sat.url} type={docs.sat.type} className="w-full h-56">
                        <a href={docs.sat.url} target="_blank" rel="noreferrer">Ver {docs.sat.name}</a>
                      </object>
                    )
                  ) : (
                    <div className="text-sm text-muted-foreground">No hay SAT cargado</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Constancia No Penal */}
          <div>
            <h4 className="font-semibold mb-2">Constancia No Penal</h4>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Button size="sm" onClick={() => noPenalRef.current?.click()}>Subir Constancia</Button>
                  <Button size="sm" variant="ghost" onClick={() => removeDoc("noPenal")}>Eliminar</Button>
                </div>
                <input ref={noPenalRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleDocChange("noPenal", e)} />
                <div className="rounded-md overflow-hidden border p-2 bg-muted">
                  {docs.noPenal ? (
                    docs.noPenal.type.startsWith("image/") ? (
                      <img src={docs.noPenal.url} alt={docs.noPenal.name} className="w-full h-56 object-contain" />
                    ) : (
                      <object data={docs.noPenal.url} type={docs.noPenal.type} className="w-full h-56">
                        <a href={docs.noPenal.url} target="_blank" rel="noreferrer">Ver {docs.noPenal.name}</a>
                      </object>
                    )
                  ) : (
                    <div className="text-sm text-muted-foreground">No hay constancia cargada</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Certificado de Guía Turístico */}
          <div>
            <h4 className="font-semibold mb-2">Certificado de Guía Turístico</h4>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Button size="sm" onClick={() => certRef.current?.click()}>Subir Certificado</Button>
                  <Button size="sm" variant="ghost" onClick={() => removeDoc("certificado")}>Eliminar</Button>
                </div>
                <input ref={certRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleDocChange("certificado", e)} />
                <div className="rounded-md overflow-hidden border p-2 bg-muted">
                  {docs.certificado ? (
                    docs.certificado.type.startsWith("image/") ? (
                      <img src={docs.certificado.url} alt={docs.certificado.name} className="w-full h-56 object-contain" />
                    ) : (
                      <object data={docs.certificado.url} type={docs.certificado.type} className="w-full h-56">
                        <a href={docs.certificado.url} target="_blank" rel="noreferrer">Ver {docs.certificado.name}</a>
                      </object>
                    )
                  ) : (
                    <div className="text-sm text-muted-foreground">No hay certificado cargado</div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
