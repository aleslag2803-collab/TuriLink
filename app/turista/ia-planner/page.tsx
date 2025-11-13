"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, Calendar, Users, DollarSign, Zap, Target, Crown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IAPlannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold">Planificador Inteligente con IA</h1>
        </div>
        <p className="text-muted-foreground">Deja que la inteligencia artificial diseñe tu itinerario perfecto</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-accent/50">
          <CardContent className="pt-6 text-center">
            <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Rutas Optimizadas</h3>
            <p className="text-sm text-muted-foreground">Ahorra tiempo con rutas inteligentes</p>
          </CardContent>
        </Card>
        <Card className="border-accent/50">
          <CardContent className="pt-6 text-center">
            <Target className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">100% Personalizado</h3>
            <p className="text-sm text-muted-foreground">Basado en tus preferencias</p>
          </CardContent>
        </Card>
        <Card className="border-accent/50">
          <CardContent className="pt-6 text-center">
            <Users className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Mejores Guías</h3>
            <p className="text-sm text-muted-foreground">Match automático con expertos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-accent/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Crear Itinerario Inteligente</CardTitle>
            <Badge className="bg-accent text-accent-foreground gap-1">
              <Crown className="w-3 h-3" />
              Premium
            </Badge>
          </div>
          <CardDescription>Completa tus preferencias y deja que la IA haga el resto</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destino">Destino Principal</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="destino" placeholder="Ej: Ciudad de México" className="pl-10" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="fecha-inicio" type="date" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha-fin">Fecha de Fin</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="fecha-fin" type="date" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="personas">Número de Personas</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="personas" type="number" placeholder="2" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="presupuesto">Presupuesto Diario</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="presupuesto" type="number" placeholder="1000" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intereses">Intereses</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tus intereses principales" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="historia">Historia y Cultura</SelectItem>
                  <SelectItem value="gastronomia">Gastronomía</SelectItem>
                  <SelectItem value="arte">Arte y Museos</SelectItem>
                  <SelectItem value="naturaleza">Naturaleza y Aventura</SelectItem>
                  <SelectItem value="arquitectura">Arquitectura</SelectItem>
                  <SelectItem value="vida-nocturna">Vida Nocturna</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferencias">Preferencias Adicionales</Label>
              <Textarea
                id="preferencias"
                rows={4}
                placeholder="Cuéntanos más sobre lo que te gustaría experimentar, lugares específicos que quieres visitar, alergias alimentarias, etc."
              />
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">¿Qué incluye tu itinerario?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ruta optimizada día por día</li>
                    <li>• Recomendación de guías certificados</li>
                    <li>• Sugerencias de restaurantes y lugares</li>
                    <li>• Estimación de costos y tiempos</li>
                    <li>• Reservas automáticas (opcional)</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full">
              <Sparkles className="w-5 h-5 mr-2" />
              Generar Itinerario con IA
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Funcionalidad Premium</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="font-semibold">$9.99 USD/mes</span>
                <span className="text-muted-foreground">o</span>
                <span className="font-semibold text-green-eco">$99 USD/año (ahorra 17%)</span>
              </div>
              <Button variant="link" className="mt-2">
                Activar Premium →
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
