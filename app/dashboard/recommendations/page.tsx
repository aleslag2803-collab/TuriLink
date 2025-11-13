"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { mockGuides } from "@/lib/mock-data"
import { Sparkles, Star, Leaf, Users, Settings2, CheckCircle2 } from "lucide-react"

export default function RecommendationsPage() {
  const [preferences, setPreferences] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleGetRecommendations = () => {
    setShowResults(true)
  }

  const preferenceOptions = [
    { id: "cultura", label: "Cultura & Historia" },
    { id: "aventura", label: "Aventura & Naturaleza" },
    { id: "gastronomia", label: "Gastronomía Local" },
    { id: "ecoturismo", label: "Ecoturismo" },
    { id: "urbano", label: "Tours Urbanos" },
  ]

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Recomendaciones Personalizadas</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Encuentra los guías y experiencias perfectas según tus preferencias
        </p>
      </div>

      {/* Preferences Selection */}
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Settings2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Tus Preferencias</h2>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-base mb-4 block">¿Qué tipo de experiencias te interesan?</Label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {preferenceOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    id={option.id}
                    checked={preferences.includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPreferences([...preferences, option.id])
                      } else {
                        setPreferences(preferences.filter((p) => p !== option.id))
                      }
                    }}
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGetRecommendations}
            size="lg"
            className="w-full md:w-auto"
            disabled={preferences.length === 0}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Obtener Recomendaciones
          </Button>
        </div>
      </Card>

      {/* Results */}
      {showResults && (
        <div className="space-y-6">
          <Card className="p-6 bg-primary/5 border-primary">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold text-card-foreground">
                  ¡Encontramos {mockGuides.length} guías perfectos para ti!
                </p>
                <p className="text-sm text-muted-foreground">
                  Basado en tus preferencias:{" "}
                  {preferences.map((p) => preferenceOptions.find((o) => o.id === p)?.label).join(", ")}
                </p>
              </div>
            </div>
          </Card>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Guías Recomendados</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockGuides.map((guide) => (
                <Card
                  key={guide.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-primary/20"
                >
                  <div className="relative h-48 bg-muted">
                    <img
                      src={guide.photo || "/placeholder.svg"}
                      alt={guide.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Top Match
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-card-foreground mb-1">{guide.name}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{guide.specialty}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold">{guide.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{guide.touristsGuided} tours</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.languages.slice(0, 2).map((lang, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                      {guide.ecoFriendly && (
                        <Badge variant="secondary" className="text-xs">
                          <Leaf className="w-3 h-3 mr-1" />
                          Eco
                        </Badge>
                      )}
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/dashboard/guides/${guide.id}`}>Ver Perfil</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!showResults && (
        <Card className="p-12">
          <div className="text-center max-w-md mx-auto">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Selecciona tus preferencias</h3>
            <p className="text-muted-foreground leading-relaxed">
              Elige al menos una preferencia arriba para obtener recomendaciones personalizadas de guías y experiencias
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
