"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function GuideRegisterPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Registro de Guía Turístico</h1>
        <p className="text-lg text-muted-foreground">
          Completa tu perfil y únete a nuestra comunidad de guías certificados
        </p>
      </div>

      {submitted && (
        <Card className="p-6 bg-primary/5 border-primary">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-card-foreground">¡Solicitud enviada!</p>
              <p className="text-sm text-muted-foreground">Revisaremos tu solicitud y te contactaremos en 48 horas</p>
            </div>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">Información Personal</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo *</Label>
              <Input id="fullName" placeholder="Juan Pérez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input id="email" type="email" placeholder="juan@ejemplo.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input id="phone" type="tel" placeholder="+52 555 123 4567" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Foto de Perfil</Label>
              <div className="flex items-center gap-3">
                <Input id="photo" type="file" accept="image/*" />
              </div>
            </div>
          </div>
        </Card>

        {/* Professional Information */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">Información Profesional</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cultura">Cultura & Historia</SelectItem>
                  <SelectItem value="aventura">Aventura & Naturaleza</SelectItem>
                  <SelectItem value="gastronomia">Gastronomía Local</SelectItem>
                  <SelectItem value="ecoturismo">Ecoturismo</SelectItem>
                  <SelectItem value="urbano">Tours Urbanos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Personal *</Label>
              <Textarea
                id="description"
                placeholder="Cuéntanos sobre tu experiencia, pasión por el turismo y qué hace únicos tus tours..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Idiomas *</Label>
              <div className="grid md:grid-cols-3 gap-4">
                {["Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués"].map((lang) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <Checkbox id={lang} />
                    <label
                      htmlFor={lang}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {lang}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transport">Tipo de Transporte *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo de transporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="propio">Vehículo Propio</SelectItem>
                  <SelectItem value="publico">Transporte Público</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="ecoFriendly" />
              <label
                htmlFor="ecoFriendly"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Promuevo prácticas de turismo sostenible
              </label>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">Documentos de Verificación</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="idDocument">Identificación Oficial (INE/Pasaporte) *</Label>
              <Input id="idDocument" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
              <p className="text-xs text-muted-foreground">Formatos aceptados: PDF, JPG, PNG (máx. 5MB)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificate">Certificado de Antecedentes No Penales *</Label>
              <Input id="certificate" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
              <p className="text-xs text-muted-foreground">Formatos aceptados: PDF, JPG, PNG (máx. 5MB)</p>
            </div>

            <Card className="p-4 bg-muted/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground mb-1">Proceso de Verificación</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Nuestro equipo revisará tus documentos en un plazo de 48 horas. Te contactaremos por correo
                    electrónico con el resultado de la verificación.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Card>

        {/* Terms */}
        <Card className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox id="terms" required />
            <div className="space-y-1">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los términos y condiciones *
              </label>
              <p className="text-xs text-muted-foreground leading-relaxed">
                He leído y acepto los términos de servicio, políticas de privacidad y código de conducta de TuriLink.
              </p>
            </div>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" size="lg" className="flex-1">
            Enviar Solicitud
          </Button>
          <Button type="button" variant="outline" size="lg">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
