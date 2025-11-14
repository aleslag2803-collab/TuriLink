"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { Compass, Loader2, Upload, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function RegistroPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [tipo, setTipo] = useState<"turista" | "guia">("turista")
  const [step, setStep] = useState(1)
  
  // Estado para formulario de turista
  const [turistaData, setTuristaData] = useState({
    // Paso 1: Datos básicos
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    fechaNacimiento: "",
    nacionalidad: "",
    ciudad: "",
    // Paso 2: Preferencias y gustos
    preferencias: [] as string[],
    idiomas: [] as string[],
    presupuesto: "",
    tipoViaje: "",
    // Paso 3: Descripción
    descripcion: "",
    interesesEspecificos: "",
  })

  // Estado para formulario de guía
  const [guiaData, setGuiaData] = useState({
    // Paso 1: Datos personales básicos
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    // Paso 2: Documentación
    documentoINE: null as File | null,
    numeroINE: "",
    antecedentesNoPenales: null as File | null,
    certificadoGuia: null as File | null,
    numeroCertificado: "",
    // Paso 3: Información profesional
    experienciaAnios: "",
    especialidades: [] as string[],
    idiomas: [] as string[],
    cuentaVehiculo: false,
    tipoVehiculo: "",
    capacidadVehiculo: "",
    // Paso 4: Descripción profesional
    descripcion: "",
    zonasCoberturas: "",
    tarifaPromedio: "",
  })

  const { signup } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const preferenciasTurista = [
    "Aventura",
    "Cultura",
    "Gastronomía",
    "Naturaleza",
    "Historia",
    "Fotografía",
    "Deportes extremos",
    "Relax y spa",
  ]

  const especialidadesGuia = [
    "Tours históricos",
    "Ecoturismo",
    "Gastronomía local",
    "Aventura y deportes",
    "Arte y cultura",
    "Tours fotográficos",
    "Turismo rural",
    "Tours nocturnos",
  ]

  const idiomasDisponibles = ["Español", "Inglés", "Francés", "Alemán", "Portugués", "Italiano", "Chino", "Japonés"]

  const handleTuristaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTuristaData({ ...turistaData, [e.target.name]: e.target.value })
  }

  const handleGuiaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGuiaData({ ...guiaData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null
    setGuiaData({ ...guiaData, [field]: file })
  }

  const togglePreferencia = (pref: string) => {
    setTuristaData((prev) => ({
      ...prev,
      preferencias: prev.preferencias.includes(pref)
        ? prev.preferencias.filter((p) => p !== pref)
        : [...prev.preferencias, pref],
    }))
  }

  const toggleEspecialidad = (esp: string) => {
    setGuiaData((prev) => ({
      ...prev,
      especialidades: prev.especialidades.includes(esp)
        ? prev.especialidades.filter((e) => e !== esp)
        : [...prev.especialidades, esp],
    }))
  }

  const toggleIdiomaTurista = (idioma: string) => {
    setTuristaData((prev) => ({
      ...prev,
      idiomas: prev.idiomas.includes(idioma)
        ? prev.idiomas.filter((i) => i !== idioma)
        : [...prev.idiomas, idioma],
    }))
  }

  const toggleIdiomaGuia = (idioma: string) => {
    setGuiaData((prev) => ({
      ...prev,
      idiomas: prev.idiomas.includes(idioma)
        ? prev.idiomas.filter((i) => i !== idioma)
        : [...prev.idiomas, idioma],
    }))
  }

  const nextStep = () => {
    console.log("[v0] nextStep called, current step:", step)
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("[v0] handleSubmit called, current step:", step, "total steps:", totalSteps)
    
    if (step < totalSteps) {
      console.log("[v0] Not on last step, preventing submission")
      return
    }
    
    console.log("[v0] On last step, proceeding with registration")
    setIsLoading(true)

    try {
      const userData = tipo === "turista" ? turistaData : guiaData
      await signup({ ...userData, tipo })
      
      toast({
        title: "Cuenta creada exitosamente",
        description: tipo === "guia" 
          ? "Tu cuenta está en revisión. Te notificaremos cuando esté aprobada."
          : "Bienvenido a TuriLink!",
      })
      
      router.push(tipo === "guia" ? "/guia/dashboard" : "/turista/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la cuenta. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalSteps = tipo === "turista" ? 3 : 4

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Crear Cuenta en TuriLink</CardTitle>
          <CardDescription>
            Paso {step} de {totalSteps} - {tipo === "turista" ? "Registro de Turista" : "Registro de Guía Profesional"}
          </CardDescription>
          
          {/* Progress bar */}
          <div className="flex gap-2 mt-4">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full ${
                  idx + 1 <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={tipo} onValueChange={(v) => {
            setTipo(v as "turista" | "guia")
            setStep(1)
          }} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="turista">Turista</TabsTrigger>
              <TabsTrigger value="guia">Guía</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit}>
            {tipo === "turista" ? (
              <>
                {/* Turista - Paso 1: Datos básicos */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Datos Básicos</h3>
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Juan Pérez García"
                        value={turistaData.nombre}
                        onChange={handleTuristaChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={turistaData.email}
                          onChange={handleTuristaChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          placeholder="+57 300 123 4567"
                          value={turistaData.telefono}
                          onChange={handleTuristaChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={turistaData.password}
                        onChange={handleTuristaChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                        <Input
                          id="fechaNacimiento"
                          name="fechaNacimiento"
                          type="date"
                          value={turistaData.fechaNacimiento}
                          onChange={handleTuristaChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nacionalidad">Nacionalidad</Label>
                        <Input
                          id="nacionalidad"
                          name="nacionalidad"
                          placeholder="Mexicana"
                          value={turistaData.nacionalidad}
                          onChange={handleTuristaChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad de residencia</Label>
                      <Input
                        id="ciudad"
                        name="ciudad"
                        placeholder="Ciudad de México"
                        value={turistaData.ciudad}
                        onChange={handleTuristaChange}
                      />
                    </div>
                  </div>
                )}

                {/* Turista - Paso 2: Preferencias y gustos */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Preferencias y Gustos</h3>
                    
                    <div className="space-y-2">
                      <Label>Preferencias de viaje (selecciona todas las que apliquen)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {preferenciasTurista.map((pref) => {
                          const isSelected = turistaData.preferencias.includes(pref)
                          return (
                            <button
                              key={pref}
                              type="button"
                              onClick={() => togglePreferencia(pref)}
                              className={`p-3 border-2 rounded-lg transition-all text-left ${
                                isSelected
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  isSelected ? 'bg-primary border-primary' : 'border-input'
                                }`}>
                                  {isSelected && (
                                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                                <span className="text-sm font-medium">{pref}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Idiomas que hablas</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {idiomasDisponibles.map((idioma) => {
                          const isSelected = turistaData.idiomas.includes(idioma)
                          return (
                            <button
                              key={idioma}
                              type="button"
                              onClick={() => toggleIdiomaTurista(idioma)}
                              className={`p-2 border rounded-lg transition-all text-center ${
                                isSelected
                                  ? "border-primary bg-primary/10 font-medium"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <span className="text-sm">{idioma}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="presupuesto">Presupuesto promedio por tour</Label>
                        <Select
                          value={turistaData.presupuesto}
                          onValueChange={(value) => setTuristaData({ ...turistaData, presupuesto: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economico">Económico ($0 - $50)</SelectItem>
                            <SelectItem value="medio">Medio ($50 - $150)</SelectItem>
                            <SelectItem value="alto">Alto ($150 - $300)</SelectItem>
                            <SelectItem value="premium">Premium ($300+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipoViaje">Tipo de viaje preferido</Label>
                        <Select
                          value={turistaData.tipoViaje}
                          onValueChange={(value) => setTuristaData({ ...turistaData, tipoViaje: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo</SelectItem>
                            <SelectItem value="pareja">En pareja</SelectItem>
                            <SelectItem value="familia">En familia</SelectItem>
                            <SelectItem value="grupo">En grupo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Turista - Paso 3: Descripción */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Cuéntanos más sobre ti</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción personal</Label>
                      <Textarea
                        id="descripcion"
                        name="descripcion"
                        placeholder="Cuéntanos un poco sobre ti, tus experiencias de viaje, qué te gusta hacer cuando viajas..."
                        value={turistaData.descripcion}
                        onChange={handleTuristaChange}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta información ayudará a los guías a personalizar las experiencias
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interesesEspecificos">Intereses específicos</Label>
                      <Textarea
                        id="interesesEspecificos"
                        name="interesesEspecificos"
                        placeholder="Por ejemplo: fotografía de vida silvestre, comida vegana, sitios arqueológicos, deportes acuáticos..."
                        value={turistaData.interesesEspecificos}
                        onChange={handleTuristaChange}
                        rows={3}
                      />
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-medium text-sm">¡Casi listo!</p>
                          <p className="text-sm text-muted-foreground">
                            Al crear tu cuenta podrás explorar tours, reservar experiencias y conectar con guías locales
                            certificados.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Guía - Paso 1: Datos personales básicos */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Datos Personales Básicos</h3>
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo *</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="María González López"
                        value={guiaData.nombre}
                        onChange={handleGuiaChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="guia@email.com"
                          value={guiaData.email}
                          onChange={handleGuiaChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono *</Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          placeholder="+57 300 123 4567"
                          value={guiaData.telefono}
                          onChange={handleGuiaChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={guiaData.password}
                        onChange={handleGuiaChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaNacimiento">Fecha de nacimiento *</Label>
                      <Input
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        value={guiaData.fechaNacimiento}
                        onChange={handleGuiaChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección completa *</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        placeholder="Calle 123, Colonia Centro"
                        value={guiaData.direccion}
                        onChange={handleGuiaChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ciudad">Ciudad *</Label>
                        <Input
                          id="ciudad"
                          name="ciudad"
                          placeholder="Cartagena"
                          value={guiaData.ciudad}
                          onChange={handleGuiaChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="codigoPostal">Código Postal</Label>
                        <Input
                          id="codigoPostal"
                          name="codigoPostal"
                          placeholder="130001"
                          value={guiaData.codigoPostal}
                          onChange={handleGuiaChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Guía - Paso 2: Documentación */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Documentación Requerida</h3>
                    <p className="text-sm text-muted-foreground">
                      Para validar tu cuenta como guía profesional, necesitamos los siguientes documentos:
                    </p>

                    <div className="space-y-2">
                      <Label htmlFor="documentoINE">
                        Identificación Oficial (INE/IFE/Pasaporte) * 
                        <Badge variant="outline" className="ml-2">PDF o JPG, max 5MB</Badge>
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="documentoINE"
                          name="documentoINE"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "documentoINE")}
                          required
                          className="cursor-pointer"
                        />
                        {guiaData.documentoINE && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numeroINE">Número de documento *</Label>
                      <Input
                        id="numeroINE"
                        name="numeroINE"
                        placeholder="1234567890123"
                        value={guiaData.numeroINE}
                        onChange={handleGuiaChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="antecedentesNoPenales">
                        Carta de Antecedentes No Penales *
                        <Badge variant="outline" className="ml-2">PDF, max 5MB</Badge>
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="antecedentesNoPenales"
                          name="antecedentesNoPenales"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, "antecedentesNoPenales")}
                          required
                          className="cursor-pointer"
                        />
                        {guiaData.antecedentesNoPenales && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Documento vigente emitido por autoridad competente
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificadoGuia">
                        Certificado Oficial de Guía de Turistas
                        <Badge variant="secondary" className="ml-2">Opcional</Badge>
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="certificadoGuia"
                          name="certificadoGuia"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "certificadoGuia")}
                          className="cursor-pointer"
                        />
                        {guiaData.certificadoGuia && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </div>

                    {guiaData.certificadoGuia && (
                      <div className="space-y-2">
                        <Label htmlFor="numeroCertificado">Número de certificado</Label>
                        <Input
                          id="numeroCertificado"
                          name="numeroCertificado"
                          placeholder="CERT-GUIA-2024-001"
                          value={guiaData.numeroCertificado}
                          onChange={handleGuiaChange}
                        />
                      </div>
                    )}

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Nota:</strong> Todos los documentos serán verificados por nuestro equipo. El proceso de
                        verificación puede tomar entre 24-48 horas.
                      </p>
                    </div>
                  </div>
                )}

                {/* Guía - Paso 3: Información profesional */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Información Profesional</h3>

                    <div className="space-y-2">
                      <Label htmlFor="experienciaAnios">Años de experiencia como guía *</Label>
                      <Select
                        value={guiaData.experienciaAnios}
                        onValueChange={(value) => setGuiaData({ ...guiaData, experienciaAnios: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">Menos de 1 año</SelectItem>
                          <SelectItem value="1-3">1-3 años</SelectItem>
                          <SelectItem value="3-5">3-5 años</SelectItem>
                          <SelectItem value="5-10">5-10 años</SelectItem>
                          <SelectItem value="10+">Más de 10 años</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Especialidades (selecciona todas las que apliquen) *</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {especialidadesGuia.map((esp) => {
                          const isSelected = guiaData.especialidades.includes(esp)
                          return (
                            <button
                              key={esp}
                              type="button"
                              onClick={() => toggleEspecialidad(esp)}
                              className={`p-3 border-2 rounded-lg transition-all text-left ${
                                isSelected
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  isSelected ? 'bg-primary border-primary' : 'border-input'
                                }`}>
                                  {isSelected && (
                                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                                <span className="text-sm font-medium">{esp}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Idiomas que dominas *</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {idiomasDisponibles.map((idioma) => {
                          const isSelected = guiaData.idiomas.includes(idioma)
                          return (
                            <button
                              key={idioma}
                              type="button"
                              onClick={() => toggleIdiomaGuia(idioma)}
                              className={`p-2 border rounded-lg transition-all text-center ${
                                isSelected
                                  ? "border-primary bg-primary/10 font-medium"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <span className="text-sm">{idioma}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="cuentaVehiculo"
                          checked={guiaData.cuentaVehiculo}
                          onCheckedChange={(checked) =>
                            setGuiaData({ ...guiaData, cuentaVehiculo: checked as boolean })
                          }
                        />
                        <Label htmlFor="cuentaVehiculo" className="cursor-pointer">
                          Cuento con vehículo propio para tours
                        </Label>
                      </div>
                    </div>

                    {guiaData.cuentaVehiculo && (
                      <div className="grid grid-cols-2 gap-4 pl-6 border-l-2 border-primary">
                        <div className="space-y-2">
                          <Label htmlFor="tipoVehiculo">Tipo de vehículo</Label>
                          <Select
                            value={guiaData.tipoVehiculo}
                            onValueChange={(value) => setGuiaData({ ...guiaData, tipoVehiculo: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Automóvil</SelectItem>
                              <SelectItem value="van">Van/Minivan</SelectItem>
                              <SelectItem value="suv">SUV</SelectItem>
                              <SelectItem value="bus">Autobús</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacidadVehiculo">Capacidad de pasajeros</Label>
                          <Input
                            id="capacidadVehiculo"
                            name="capacidadVehiculo"
                            type="number"
                            placeholder="4"
                            value={guiaData.capacidadVehiculo}
                            onChange={handleGuiaChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Guía - Paso 4: Descripción profesional */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Descripción Profesional</h3>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción profesional *</Label>
                      <Textarea
                        id="descripcion"
                        name="descripcion"
                        placeholder="Cuéntales a los turistas sobre tu experiencia, tu pasión por el turismo, logros destacados, certificaciones adicionales, etc."
                        value={guiaData.descripcion}
                        onChange={handleGuiaChange}
                        rows={5}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Esta será tu presentación ante los turistas. Hazla atractiva y profesional.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zonasCoberturas">Zonas de cobertura *</Label>
                      <Textarea
                        id="zonasCoberturas"
                        name="zonasCoberturas"
                        placeholder="Ejemplo: Centro histórico de Cartagena, Islas del Rosario, Barrio Getsemaní, Castillo de San Felipe..."
                        value={guiaData.zonasCoberturas}
                        onChange={handleGuiaChange}
                        rows={3}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Menciona las ciudades, barrios o zonas donde ofreces tus servicios
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tarifaPromedio">Tarifa promedio por tour (USD) *</Label>
                      <Select
                        value={guiaData.tarifaPromedio}
                        onValueChange={(value) => setGuiaData({ ...guiaData, tarifaPromedio: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rango" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20-50">$20 - $50 USD</SelectItem>
                          <SelectItem value="50-100">$50 - $100 USD</SelectItem>
                          <SelectItem value="100-200">$100 - $200 USD</SelectItem>
                          <SelectItem value="200-500">$200 - $500 USD</SelectItem>
                          <SelectItem value="500+">$500+ USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-medium text-sm">¡Último paso!</p>
                          <p className="text-sm text-muted-foreground">
                            Tu cuenta será revisada por nuestro equipo de validación. Una vez aprobada, podrás comenzar
                            a ofrecer tus servicios y conectar con turistas de todo el mundo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    nextStep()
                  }}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Crear Cuenta
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión aquí
            </Link>
          </div>
          <div className="text-sm text-center text-muted-foreground">
            <Link href="/" className="hover:underline">
              Volver al inicio
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
