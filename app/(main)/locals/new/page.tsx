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
import { CheckCircle2, AlertCircle, Upload, MapPin, ImageIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLocals } from "@/app/providers"
import type { Local } from "@/lib/mock-data"

export default function AddPlacePage() {
  const router = useRouter()
  const { addLocal } = useLocals()
  const [submitted, setSubmitted] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "" as "restaurant" | "natural" | "cultural" | "adventure" | "",
    address: "",
    latitude: "",
    longitude: "",
    ecoFriendly: false,
    image: null as string | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target as HTMLInputElement
    const target = e.target as HTMLInputElement

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: target.value,
      }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setImagePreview(imageData)
        setFormData((prev) => ({
          ...prev,
          image: imageData,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setImagePreview(null)
    setFormData((prev) => ({
      ...prev,
      image: null,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value as "restaurant" | "natural" | "cultural" | "adventure",
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.type || !formData.address) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    const newLocal: Omit<Local, "id" | "rating" | "reviews"> = {
      name: formData.name,
      description: formData.description,
      type: formData.type as "restaurant" | "natural" | "cultural" | "adventure",
      location: {
        lat: formData.latitude ? Number.parseFloat(formData.latitude) : 0,
        lon: formData.longitude ? Number.parseFloat(formData.longitude) : 0,
        address: formData.address,
      },
      ecoFriendly: formData.ecoFriendly,
      images: formData.image ? [formData.image] : ["/lugar-turistico.jpg"],
    }

    addLocal(newLocal)
    setSubmitted(true)

    setTimeout(() => {
      router.push("/locals")
    }, 3000)
  }

  const placeTypes = [
    { value: "restaurant", label: "Restaurante" },
    { value: "natural", label: "Lugar Natural" },
    { value: "cultural", label: "Sitio Cultural" },
    { value: "adventure", label: "Aventura" },
  ]

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Agregar un Nuevo Lugar</h1>
        <p className="text-lg text-muted-foreground">Comparte tus descubrimientos con la comunidad de TuriLink</p>
      </div>

      {submitted && (
        <Card className="p-6 bg-primary/5 border-primary">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold text-card-foreground">¡Lugar agregado exitosamente!</p>
              <p className="text-sm text-muted-foreground">
                Tu lugar ha sido compartido con la comunidad. Redirigiendo a la galería de lugares...
              </p>
            </div>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información Básica */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">Información Básica</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Lugar *</Label>
              <Input
                id="name"
                name="name"
                placeholder="ej: Cascadas de Agua Azul"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Lugar *</Label>
              <Select value={formData.type} onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de lugar" />
                </SelectTrigger>
                <SelectContent>
                  {placeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Detallada *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe el lugar, su historia, lo que hace especial, qué disfrutarán los visitantes..."
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-muted-foreground">Sé detallado para atraer a más visitantes</p>
            </div>
          </div>
        </Card>

        {/* Ubicación */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Ubicación del Lugar
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección o Referencia *</Label>
              <Input
                id="address"
                name="address"
                placeholder="ej: Carretera a Agua Azul km 20, Chiapas"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitud (opcional)</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="ej: 17.25"
                  type="number"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitud (opcional)</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="ej: -92.1167"
                  type="number"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Card className="p-4 bg-muted/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-card-foreground mb-1">Consejo de Ubicación</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Si no conoces las coordenadas exactas, no hay problema. Cualquier referencia clara es válida para
                    que otros usuarios encuentren el lugar.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Card>

        {/* Imágenes y Características */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            Imágenes y Características
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Foto Principal del Lugar</Label>
              {imagePreview ? (
                <div className="space-y-3">
                  <div className="relative h-48 rounded-lg overflow-hidden border border-border">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={clearImage}>
                    <X className="w-4 h-4 mr-2" />
                    Cambiar Imagen
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline" asChild>
                    <label>
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Imagen
                      <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG (máx. 5MB)</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Una buena foto hará que muchas personas quieran visitar tu lugar
              </p>
            </div>

            <div className="space-y-3">
              <Label>Características del Lugar</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ecoFriendly"
                    checked={formData.ecoFriendly}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        ecoFriendly: checked === true,
                      }))
                    }
                  />
                  <label
                    htmlFor="ecoFriendly"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Este es un lugar eco-friendly o sostenible
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Términos y Condiciones */}
        <Card className="p-4 bg-primary/5 border-primary">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-card-foreground mb-1">Contribuir a la Comunidad</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Al compartir este lugar, ayudas a otros viajeros a descubrir experiencias auténticas. Asegúrate de que
                la información sea precisa y actualizada. Los lugares se verificarán antes de publicarse.
              </p>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full">
          Compartir Lugar con la Comunidad
        </Button>
      </form>
    </div>
  )
}
