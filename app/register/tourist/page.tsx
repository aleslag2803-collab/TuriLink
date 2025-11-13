"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCircle, ArrowLeft } from "lucide-react"

export default function TouristRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular creación de cuenta
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Crear cuenta de Turista</h1>
              <p className="text-muted-foreground">Únete a TuriLink y descubre experiencias únicas</p>
            </div>
          </div>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input id="firstName" placeholder="Juan" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input id="lastName" placeholder="Pérez" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input id="email" type="email" placeholder="juan@ejemplo.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required minLength={8} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                <Input id="confirmPassword" type="password" placeholder="Repite tu contraseña" required minLength={8} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input id="phone" type="tel" placeholder="+52 555 123 4567" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">País *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mexico">México</SelectItem>
                    <SelectItem value="usa">Estados Unidos</SelectItem>
                    <SelectItem value="canada">Canadá</SelectItem>
                    <SelectItem value="spain">España</SelectItem>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="colombia">Colombia</SelectItem>
                    <SelectItem value="chile">Chile</SelectItem>
                    <SelectItem value="peru">Perú</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Intereses (opcional)</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Cultura & Historia",
                    "Aventura & Naturaleza",
                    "Gastronomía Local",
                    "Ecoturismo",
                    "Arte & Museos",
                    "Deportes Extremos",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox id={interest} />
                      <label
                        htmlFor={interest}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3 border-t border-border pt-6">
              <Checkbox id="terms" required />
              <div className="space-y-1">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto los términos y condiciones *
                </label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  He leído y acepto los{" "}
                  <Link href="#" className="text-primary hover:underline">
                    términos de servicio
                  </Link>{" "}
                  y{" "}
                  <Link href="#" className="text-primary hover:underline">
                    políticas de privacidad
                  </Link>{" "}
                  de TuriLink.
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Inicia sesión
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}
