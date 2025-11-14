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
import { Sparkles, Plus, Clock, Users, Heart, Edit, Trash2, ImageIcon, Calendar, Upload, X, ArrowRight, ArrowLeft } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Experience {
  id: string
  title: string
  description: string
  fullDescription: string
  price: number
  duration: string
  capacity: number
  bookings: number
  category: string
  included: string[]
  requirements: string
  images: string[] // Changed to array of images
  location: string
  language: string[]
  difficulty: string
  createdAt: string
}

export default function ExperienciasPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const { toast } = useToast()
  
  const [imagePreview1, setImagePreview1] = useState<string>("")
  const [imagePreview2, setImagePreview2] = useState<string>("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    price: "",
    duration: "",
    capacity: "",
    category: "",
    included: "",
    requirements: "",
    location: "",
    language: [] as string[],
    difficulty: "",
  })

  const [formStep, setFormStep] = useState(1)

  useEffect(() => {
    const savedExperiences = localStorage.getItem("turilink_experiences")
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences))
    } else {
      const demoData: Experience[] = [
        {
          id: "1",
          title: "Clase de Cocina Mexicana",
          description: "Aprende a preparar auténticos platillos mexicanos",
          fullDescription: "Sumérgete en la cultura culinaria mexicana con nuestra clase de cocina práctica. Aprenderás a preparar platillos tradicionales desde cero, conocerás ingredientes locales y técnicas ancestrales que han pasado de generación en generación.",
          price: 890,
          duration: "3 horas",
          capacity: 8,
          bookings: 12,
          category: "Gastronomía",
          included: ["Ingredientes", "Recetario digital", "Degustación", "Certificado"],
          requirements: "No se requiere experiencia previa",
          images: ["/mexican-cooking-class.jpg"], // Updated to array of images
          location: "Cocina del Chef, Centro Histórico",
          language: ["Español", "Inglés"],
          difficulty: "Principiante",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Taller de Artesanías",
          description: "Crea tu propia artesanía con técnicas tradicionales",
          fullDescription: "Descubre el arte tradicional mexicano en este taller práctico. Trabajarás con artesanos locales para crear tu propia pieza usando técnicas que se han preservado durante siglos.",
          price: 650,
          duration: "2.5 horas",
          capacity: 6,
          bookings: 8,
          category: "Arte y Cultura",
          included: ["Materiales", "Herramientas", "Tu creación", "Refrigerio"],
          requirements: "Ninguno",
          images: ["/mexican-handicraft-workshop.jpg"], // Updated to array of images
          location: "Taller de Artesanías Tradicionales",
          language: ["Español", "Inglés"],
          difficulty: "Principiante",
          createdAt: new Date().toISOString(),
        },
      ]
      setExperiences(demoData)
      localStorage.setItem("turilink_experiences", JSON.stringify(demoData))
    }
  }, [])

  const saveToLocalStorage = (data: Experience[]) => {
    localStorage.setItem("turilink_experiences", JSON.stringify(data))
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formStep === 1) {
      if (!formData.title || !formData.description || !formData.price || !formData.duration) {
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
      images.push("/diverse-experiences.png")
    }

    const experienceData: Experience = {
      id: editingExperience?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription,
      price: parseFloat(formData.price),
      duration: formData.duration,
      capacity: parseInt(formData.capacity) || 10,
      bookings: editingExperience?.bookings || 0,
      category: formData.category,
      included: formData.included.split(",").map((item) => item.trim()).filter(Boolean),
      requirements: formData.requirements,
      images,
      location: formData.location,
      language: formData.language,
      difficulty: formData.difficulty,
      createdAt: editingExperience?.createdAt || new Date().toISOString(),
    }

    let updatedExperiences: Experience[]
    if (editingExperience) {
      updatedExperiences = experiences.map((exp) => (exp.id === editingExperience.id ? experienceData : exp))
      toast({
        title: "Experiencia actualizada",
        description: "Los cambios se guardaron correctamente",
      })
    } else {
      updatedExperiences = [...experiences, experienceData]
      toast({
        title: "Experiencia creada",
        description: "La nueva experiencia se agregó exitosamente",
      })
    }

    setExperiences(updatedExperiences)
    saveToLocalStorage(updatedExperiences)
    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setFormData({
      title: experience.title,
      description: experience.description,
      fullDescription: experience.fullDescription,
      price: experience.price.toString(),
      duration: experience.duration,
      capacity: experience.capacity.toString(),
      category: experience.category,
      included: experience.included.join(", "),
      requirements: experience.requirements,
      location: experience.location,
      language: experience.language,
      difficulty: experience.difficulty,
    })
    setImagePreview1(experience.images && experience.images[0] ? experience.images[0] : "")
    setImagePreview2(experience.images && experience.images[1] ? experience.images[1] : "")
    setFormStep(1)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta experiencia?")) {
      const updatedExperiences = experiences.filter((exp) => exp.id !== id)
      setExperiences(updatedExperiences)
      saveToLocalStorage(updatedExperiences)
      toast({
        title: "Experiencia eliminada",
        description: "La experiencia se eliminó correctamente",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      price: "",
      duration: "",
      capacity: "",
      category: "",
      included: "",
      requirements: "",
      location: "",
      language: [],
      difficulty: "",
    })
    setImagePreview1("")
    setImagePreview2("")
    setEditingExperience(null)
    setFormStep(1)
  }

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      language: prev.language.includes(lang) ? prev.language.filter((l) => l !== lang) : [...prev.language, lang],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Experiencias</h1>
          <p className="text-muted-foreground">Crea experiencias únicas más allá de los tours tradicionales</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Experiencia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience ? "Editar Experiencia" : "Crear Nueva Experiencia"}</DialogTitle>
              <DialogDescription>
                Paso {formStep} de 2 - Completa la información de tu experiencia
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la Experiencia *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ej: Clase de Cocina Mexicana"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción Corta *</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Una descripción breve y atractiva"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Descripción Completa</Label>
                    <Textarea
                      id="fullDescription"
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="Describe detalladamente la experiencia..."
                      rows={4}
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
                          <SelectItem value="Gastronomía">Gastronomía</SelectItem>
                          <SelectItem value="Arte y Cultura">Arte y Cultura</SelectItem>
                          <SelectItem value="Aventura">Aventura</SelectItem>
                          <SelectItem value="Bienestar">Bienestar</SelectItem>
                          <SelectItem value="Naturaleza">Naturaleza</SelectItem>
                          <SelectItem value="Historia">Historia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Nivel de Dificultad</Label>
                      <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Principiante">Principiante</SelectItem>
                          <SelectItem value="Intermedio">Intermedio</SelectItem>
                          <SelectItem value="Avanzado">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Precio (MXN) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duración *</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="3 horas"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacidad máxima</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        placeholder="8"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Centro Histórico"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Imágenes de la Experiencia</Label>
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
                    <Label>Idiomas disponibles</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Español", "Inglés", "Francés", "Alemán", "Portugués"].map((lang) => (
                        <Button
                          key={lang}
                          type="button"
                          variant={formData.language.includes(lang) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleLanguageToggle(lang)}
                        >
                          {lang}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="included">Qué incluye (separado por comas)</Label>
                    <Input
                      id="included"
                      value={formData.included}
                      onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                      placeholder="Ingredientes, Recetario, Degustación"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requisitos</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="No se requiere experiencia previa"
                      rows={3}
                    />
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
                      {editingExperience ? "Guardar Cambios" : "Crear Experiencia"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {experiences.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Crea tu primera experiencia</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Ofrece algo único que vaya más allá de un tour tradicional
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Crear Experiencia
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              {exp.images && exp.images.length > 0 && (
                <div className="relative h-48 w-full">
                  <Image src={exp.images[0] || "/placeholder.svg"} alt={exp.title} fill className="object-cover" />
                  {exp.images[1] && (
                    <div className="absolute bottom-2 right-2 w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                      <Image src={exp.images[1] || "/placeholder.svg"} alt={exp.title} fill className="object-cover" />
                    </div>
                  )}
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Sparkles className="w-8 h-8 text-accent" />
                  <Badge variant="secondary">{exp.category}</Badge>
                </div>
                <CardTitle className="text-lg">{exp.title}</CardTitle>
                <CardDescription>{exp.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Hasta {exp.capacity} personas
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    {exp.bookings} reservas
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold">${exp.price}</div>
                    <div className="text-xs text-muted-foreground">MXN por persona</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(exp)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(exp.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
