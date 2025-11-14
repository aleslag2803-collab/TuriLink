"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Plus, ThumbsUp, Utensils, Coffee, ShoppingBag, Home, Building2, Edit, Trash2, Star, Clock, Upload, X, ArrowRight, ArrowLeft } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Recommendation {
  id: string
  name: string
  category: string
  description: string
  fullDescription: string
  address: string
  likes: number
  icon: string
  priceRange: string
  schedule: string
  phone: string
  website: string
  tags: string[]
  bestFor: string
  tips: string
  images: string[] // Changed to array of images
  rating: number
  createdAt: string
}

const categoryIcons = {
  Restaurante: Utensils,
  Cafetería: Coffee,
  Mercado: ShoppingBag,
  Museo: Home,
  Tienda: Building2,
  Otro: MapPin,
}

export default function RecomendacionesPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null)
  const { toast } = useToast()

  const [imagePreview1, setImagePreview1] = useState<string>("")
  const [imagePreview2, setImagePreview2] = useState<string>("")

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    fullDescription: "",
    address: "",
    priceRange: "",
    schedule: "",
    phone: "",
    website: "",
    tags: "",
    bestFor: "",
    tips: "",
    rating: "5",
  })

  const [formStep, setFormStep] = useState(1)

  useEffect(() => {
    const savedRecommendations = localStorage.getItem("turilink_recommendations")
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations))
    } else {
      const demoData: Recommendation[] = [
        {
          id: "1",
          name: "Café de Tacuba",
          category: "Restaurante",
          description: "Comida tradicional mexicana en un ambiente histórico",
          fullDescription:
            "Ubicado en el corazón del Centro Histórico, Café de Tacuba es un ícono de la gastronomía mexicana desde 1912. Ofrece platillos tradicionales en un ambiente colonial que te transporta al México de antaño.",
          address: "Tacuba 28, Centro Histórico",
          likes: 45,
          icon: "Restaurante",
          priceRange: "$$",
          schedule: "Lun-Dom: 8:00 AM - 11:00 PM",
          phone: "+52 55 5512 8482",
          website: "www.cafedetacuba.com.mx",
          tags: ["Tradicional", "Histórico", "Familiar"],
          bestFor: "Comida tradicional mexicana",
          tips: "Prueba los tamales y el chocolate caliente",
          images: ["/traditional-mexican-restaurant.jpg"], // Use images array
          rating: 4.5,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Museo Frida Kahlo",
          category: "Museo",
          description: "La Casa Azul, hogar de Frida Kahlo",
          fullDescription:
            "La Casa Azul fue el hogar de Frida Kahlo durante la mayor parte de su vida. Hoy es un museo que alberga una importante colección de obras de arte, objetos personales y recuerdos de la artista.",
          address: "Londres 247, Del Carmen, Coyoacán",
          likes: 89,
          icon: "Museo",
          priceRange: "$",
          schedule: "Mar-Dom: 10:00 AM - 5:45 PM",
          phone: "+52 55 5554 5999",
          website: "www.museofridakahlo.org.mx",
          tags: ["Arte", "Cultura", "Historia"],
          bestFor: "Amantes del arte y la historia",
          tips: "Compra boletos en línea con anticipación",
          images: ["/casa-azul-frida-kahlo.jpg"], // Use images array
          rating: 4.8,
          createdAt: new Date().toISOString(),
        },
      ]
      setRecommendations(demoData)
      localStorage.setItem("turilink_recommendations", JSON.stringify(demoData))
    }
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        if (imageNumber === 1) {
          setImagePreview1(result)
        } else {
          setImagePreview2(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (imageNumber: 1 | 2) => {
    if (imageNumber === 1) {
      setImagePreview1("")
    } else {
      setImagePreview2("")
    }
  }

  const saveToLocalStorage = (data: Recommendation[]) => {
    localStorage.setItem("turilink_recommendations", JSON.stringify(data))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formStep === 1) {
      if (!formData.name || !formData.category || !formData.description || !formData.address) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos obligatorios",
          variant: "destructive",
        })
        return
      }
      setFormStep(2)
      return
    }

    const images = [imagePreview1, imagePreview2].filter(Boolean)
    if (images.length === 0) {
      images.push("/abstract-place.png")
    }

    const recommendationData: Recommendation = {
      id: editingRecommendation?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      fullDescription: formData.fullDescription,
      address: formData.address,
      likes: editingRecommendation?.likes || 0,
      icon: formData.category,
      priceRange: formData.priceRange,
      schedule: formData.schedule,
      phone: formData.phone,
      website: formData.website,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      bestFor: formData.bestFor,
      tips: formData.tips,
      images,
      rating: parseFloat(formData.rating),
      createdAt: editingRecommendation?.createdAt || new Date().toISOString(),
    }

    let updatedRecommendations: Recommendation[]
    if (editingRecommendation) {
      updatedRecommendations = recommendations.map((rec) =>
        rec.id === editingRecommendation.id ? recommendationData : rec
      )
      toast({
        title: "Recomendación actualizada",
        description: "Los cambios se guardaron correctamente",
      })
    } else {
      updatedRecommendations = [...recommendations, recommendationData]
      toast({
        title: "Recomendación creada",
        description: "La nueva recomendación se agregó exitosamente",
      })
    }

    setRecommendations(updatedRecommendations)
    saveToLocalStorage(updatedRecommendations)
    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (recommendation: Recommendation) => {
    setEditingRecommendation(recommendation)
    setFormData({
      name: recommendation.name,
      category: recommendation.category,
      description: recommendation.description,
      fullDescription: recommendation.fullDescription,
      address: recommendation.address,
      priceRange: recommendation.priceRange,
      schedule: recommendation.schedule,
      phone: recommendation.phone,
      website: recommendation.website,
      tags: recommendation.tags.join(", "),
      bestFor: recommendation.bestFor,
      tips: recommendation.tips,
      rating: recommendation.rating.toString(),
    })
    setImagePreview1(recommendation.images && recommendation.images[0] ? recommendation.images[0] : "")
    setImagePreview2(recommendation.images && recommendation.images[1] ? recommendation.images[1] : "")
    setFormStep(1)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta recomendación?")) {
      const updatedRecommendations = recommendations.filter((rec) => rec.id !== id)
      setRecommendations(updatedRecommendations)
      saveToLocalStorage(updatedRecommendations)
      toast({
        title: "Recomendación eliminada",
        description: "La recomendación se eliminó correctamente",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      fullDescription: "",
      address: "",
      priceRange: "",
      schedule: "",
      phone: "",
      website: "",
      tags: "",
      bestFor: "",
      tips: "",
      rating: "5",
    })
    setImagePreview1("")
    setImagePreview2("")
    setEditingRecommendation(null)
    setFormStep(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Recomendaciones</h1>
          <p className="text-muted-foreground">Comparte tus lugares favoritos con los turistas</p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Lugar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRecommendation ? "Editar Recomendación" : "Agregar Nueva Recomendación"}
              </DialogTitle>
              <DialogDescription>
                Paso {formStep} de 2 - Comparte un lugar especial con los turistas
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Lugar *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Café de Tacuba"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Restaurante">Restaurante</SelectItem>
                          <SelectItem value="Cafetería">Cafetería</SelectItem>
                          <SelectItem value="Mercado">Mercado</SelectItem>
                          <SelectItem value="Museo">Museo</SelectItem>
                          <SelectItem value="Tienda">Tienda</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priceRange">Rango de Precio</Label>
                      <Select value={formData.priceRange} onValueChange={(value) => setFormData({ ...formData, priceRange: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$">$ - Económico</SelectItem>
                          <SelectItem value="$$">$$ - Moderado</SelectItem>
                          <SelectItem value="$$$">$$$ - Caro</SelectItem>
                          <SelectItem value="$$$$">$$$$ - Muy caro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción Corta *</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Una frase que capture la esencia"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Descripción Completa</Label>
                    <Textarea
                      id="fullDescription"
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="Describe el lugar, su historia, qué lo hace especial..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Calle, número, colonia"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Horario</Label>
                      <Input
                        id="schedule"
                        value={formData.schedule}
                        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                        placeholder="Lun-Dom: 8:00-22:00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+52 55 1234 5678"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Imágenes del Lugar</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Principal</Label>
                        {imagePreview1 ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden border">
                            <Image src={imagePreview1 || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => removeImage(1)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed cursor-pointer hover:bg-accent/50">
                            <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Subir</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 1)} />
                          </label>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Secundaria</Label>
                        {imagePreview2 ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden border">
                            <Image src={imagePreview2 || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => removeImage(2)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed cursor-pointer hover:bg-accent/50">
                            <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Subir</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 2)} />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="www.ejemplo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bestFor">Ideal Para</Label>
                    <Input
                      id="bestFor"
                      value={formData.bestFor}
                      onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                      placeholder="Familias, parejas, amantes del arte..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Tradicional, Histórico, Familiar"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tips">Tips y Recomendaciones</Label>
                    <Textarea
                      id="tips"
                      value={formData.tips}
                      onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                      placeholder="Consejos útiles: mejor hora, qué pedir, cómo llegar..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Calificación (1-5)</Label>
                    <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 - Excelente</SelectItem>
                        <SelectItem value="4.5">4.5 - Muy bueno</SelectItem>
                        <SelectItem value="4">4 - Bueno</SelectItem>
                        <SelectItem value="3.5">3.5 - Regular</SelectItem>
                        <SelectItem value="3">3 - Aceptable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 border-t">
                {formStep === 2 && (
                  <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}
                {formStep === 1 && <div />}
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  {formStep === 1 ? (
                    <Button type="submit">
                      Siguiente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit">
                      {editingRecommendation ? "Guardar Cambios" : "Agregar Recomendación"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {recommendations.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Agrega tu primera recomendación</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Recomienda restaurantes, museos, cafés o tiendas locales
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Recomendación
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((place) => {
            const Icon = categoryIcons[place.category as keyof typeof categoryIcons] || MapPin
            return (
              <Card key={place.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {place.images && place.images.length > 0 && (
                  <div className="relative h-48 w-full">
                    <Image src={place.images[0] || "/placeholder.svg"} alt={place.name} fill className="object-cover" />
                    {place.images[1] && (
                      <div className="absolute bottom-2 right-2 w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                        <Image src={place.images[1] || "/placeholder.svg"} alt={place.name} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="secondary">{place.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <CardDescription>{place.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{place.address}</span>
                    </div>
                    {place.schedule && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{place.schedule}</span>
                      </div>
                    )}
                    {place.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{place.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{place.likes}</span>
                      <span className="text-sm text-muted-foreground">likes</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(place)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(place.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
