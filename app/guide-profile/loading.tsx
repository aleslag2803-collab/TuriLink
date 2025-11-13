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
import { CheckCircle2, AlertCircle, Upload, User, FileText, Shield } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export default function GuideProfilePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 3000)
  }

  const steps = [
    { number: 1, title: "Información Personal", icon: User },
    { number: 2, title: "Experiencia Profesional", icon: FileText },
    { number: 3, title: "Documentación", icon: Shield },
  ]

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Completa tu Perfil de Guía</h1>
        <p className="text-lg text-muted-foreground">Agrega tu información profesional para comenzar a ofrecer tours</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
              </div>
              <p className="text-sm mt-2 text-center font-medium">{step.title}</p>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-1 flex-1 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`}
                style={{ marginTop: "-2rem" }}
              />
            )}
          </div>
        ))}
      </div>

      {submitted && (
        <Card className="p-6 bg-primary/5 border-primary">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-card-foreground">¡Perfil enviado para verificación!</p>
              <p className="text-sm text-muted-foreground">
                Revisaremos tu información y te contactaremos en 48 horas. Redirigiendo al dashboard...
              </p>
            </div>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Información Personal</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="photo">Foto de Perfil *</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Foto
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG (máx. 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo *</Label>
                <Input id="fullName" placeholder="Carlos Méndez García" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ciudad de Residencia *</Label>
                <Input id="city" placeholder="Ciudad de México" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografía Breve *</Label>
                <Textarea
                  id="bio"
                  placeholder="Cuéntanos sobre ti, tu pasión por el turismo y por qué amas tu ciudad..."
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">Esta descripción aparecerá en tu perfil público</p>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Professional Experience */}
        {currentStep === 2 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Experiencia Profesional</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu especialidad principal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultura">Cultura & Historia</SelectItem>
                    <SelectItem value="aventura">Aventura & Naturaleza</SelectItem>
                    <SelectItem value="gastronomia">Gastronomía Local</SelectItem>
                    <SelectItem value="ecoturismo">Ecoturismo</SelectItem>
                    <SelectItem value="urbano">Tours Urbanos</SelectItem>
                    <SelectItem value="arte">Arte & Museos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Años de Experiencia *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu experiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 años</SelectItem>
                    <SelectItem value="3-5">3-5 años</SelectItem>
                    <SelectItem value="6-10">6-10 años</SelectItem>
                    <SelectItem value="10+">Más de 10 años</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción de Servicios *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe los tours que ofreces, lugares que visitas, qué hace únicos tus servicios..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Idiomas que Hablas *</Label>
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
                    <SelectItem value="ambos">Ambos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Precio Aproximado por Tour (USD) *</Label>
                <Input id="price" type="number" placeholder="50" min="1" required />
                <p className="text-xs text-muted-foreground">Precio promedio por persona para tours de 4 horas</p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="ecoFriendly" />
                <label
                  htmlFor="ecoFriendly"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Promuevo prácticas de turismo sostenible y eco-friendly
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Documentation */}
        {currentStep === 3 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Documentación de Verificación</h2>
            <div className="space-y-6">
              <Card className="p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground mb-1">Documentos Requeridos</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Todos los documentos son obligatorios para verificar tu identidad y garantizar la seguridad de los
                      turistas. La información es confidencial y protegida.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="idDocument">Identificación Oficial (INE/Pasaporte) *</Label>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar Archivo
                  </Button>
                  <p className="text-sm text-muted-foreground">Ningún archivo seleccionado</p>
                </div>
                <p className="text-xs text-muted-foreground">Formatos: PDF, JPG, PNG (máx. 5MB)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificate">Certificado de Antecedentes No Penales *</Label>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar Archivo
                  </Button>
                  <p className="text-sm text-muted-foreground">Ningún archivo seleccionado</p>
                </div>
                <p className="text-xs text-muted-foreground">Formatos: PDF, JPG, PNG (máx. 5MB)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tourism-license">Licencia de Turismo (opcional)</Label>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar Archivo
                  </Button>
                  <p className="text-sm text-muted-foreground">Ningún archivo seleccionado</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Si cuentas con certificación oficial de turismo, súbela aquí
                </p>
              </div>

              <Card className="p-4 bg-primary/5 border-primary">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground mb-1">Proceso de Verificación</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Nuestro equipo revisará tu documentación en un plazo de 48 horas. Te contactaremos por correo
                      electrónico con el resultado. Una vez aprobado, podrás comenzar a recibir solicitudes de tours.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep > 1 && (
            <Button type="button" variant="outline" size="lg" onClick={() => setCurrentStep(currentStep - 1)}>
              Anterior
            </Button>
          )}
          {currentStep < 3 ? (
            <Button type="button" size="lg" className="flex-1" onClick={() => setCurrentStep(currentStep + 1)}>
              Continuar
            </Button>
          ) : (
            <Button type="submit" size="lg" className="flex-1">
              Enviar para Verificación
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
