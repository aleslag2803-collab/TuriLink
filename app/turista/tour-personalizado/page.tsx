"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, Users, ChevronRight, Check, X, ShoppingBag, Coffee, Utensils, Home, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { mockLocals } from "@/lib/mock-data"

const guides = [
  {
    id: "1",
    name: "María Elena Ceh",
    location: "Tulum, Quintana Roo",
    rating: 4.9,
    reviews: 234,
    specialties: ["Historia Maya", "Cenotes", "Ecología"],
    image: "/mexican-female-tour-guide-mayan-ruins.jpg",
    pricePerHour: 350,
    bio: "Guía certificada con 8 años de experiencia. Especializada en historia maya y ecoturismo.",
    experiences: [
      {
        id: "exp1",
        name: "Ruinas de Tulum",
        description: "Tour guiado por las antiguas ruinas mayas con vista al mar",
        duration: "2 horas",
        price: 700,
        image: "/tulum-ruins.jpg",
        category: "Historia"
      },
      {
        id: "exp2",
        name: "Cenote Sagrado",
        description: "Exploración y nado en cenotes sagrados mayas",
        duration: "3 horas",
        price: 1050,
        image: "/cenote-swimming.jpg",
        category: "Naturaleza"
      },
      {
        id: "exp3",
        name: "Reserva Natural Sian Ka'an",
        description: "Tour ecológico por la reserva de la biosfera",
        duration: "4 horas",
        price: 1400,
        image: "/sian-kaan-nature.jpg",
        category: "Ecología"
      }
    ]
  },
  {
    id: "2",
    name: "José Luis Cauich",
    location: "Playa del Carmen, Quintana Roo",
    rating: 5.0,
    reviews: 189,
    specialties: ["Snorkel", "Cultura Maya", "Gastronomía"],
    image: "/mexican-male-tour-guide-caribbean-beach.jpg",
    pricePerHour: 380,
    bio: "Instructor de buceo certificado y experto en gastronomía local.",
    experiences: [
      {
        id: "exp4",
        name: "Snorkel en Arrecifes",
        description: "Descubre la vida marina del Mar Caribe",
        duration: "3 horas",
        price: 1140,
        image: "/cozumel-island-coral-reef-diving.jpg",
        category: "Aventura"
      },
      {
        id: "exp5",
        name: "Tour Gastronómico",
        description: "Explora los mejores sabores locales",
        duration: "4 horas",
        price: 1520,
        image: "/mexican-food-tour.jpg",
        category: "Gastronomía"
      }
    ]
  },
  {
    id: "3",
    name: "Gabriela Poot",
    location: "Bacalar, Quintana Roo",
    rating: 4.8,
    reviews: 312,
    specialties: ["Laguna", "Naturaleza", "Kayak"],
    image: "/mexican-female-guide-lagoon-bacalar.jpg",
    pricePerHour: 400,
    bio: "Bióloga marina y fotógrafa profesional. Experta en la Laguna de Bacalar.",
    experiences: [
      {
        id: "exp6",
        name: "Kayak en Laguna de los 7 Colores",
        description: "Recorre las aguas cristalinas de Bacalar",
        duration: "3 horas",
        price: 1200,
        image: "/bacalar-lagoon-seven-colors-mexico.jpg",
        category: "Aventura"
      },
      {
        id: "exp7",
        name: "Amanecer en Bacalar",
        description: "Sesión fotográfica del amanecer en la laguna",
        duration: "2 horas",
        price: 800,
        image: "/bacalar-sunrise.jpg",
        category: "Fotografía"
      }
    ]
  },
  {
    id: "4",
    name: "Roberto May",
    location: "Felipe Carrillo Puerto, Quintana Roo",
    rating: 4.9,
    reviews: 167,
    specialties: ["Comunidades Mayas", "Artesanías", "Selva"],
    image: "/mexican-indigenous-male-guide-jungle.jpg",
    pricePerHour: 320,
    bio: "Descendiente directo de la cultura maya. Experto en tradiciones ancestrales.",
    experiences: [
      {
        id: "exp8",
        name: "Visita a Comunidad Maya",
        description: "Conoce las tradiciones y forma de vida maya actual",
        duration: "4 horas",
        price: 1280,
        image: "/mayan-community.jpg",
        category: "Cultura"
      },
      {
        id: "exp9",
        name: "Taller de Artesanías",
        description: "Aprende técnicas tradicionales de artesanía maya",
        duration: "3 horas",
        price: 960,
        image: "/mayan-crafts.jpg",
        category: "Arte"
      }
    ]
  }
]

type Experience = {
  id: string
  name: string
  description: string
  duration: string
  price: number
  image: string
  category: string
}

type Local = {
  id: string
  name: string
  category: string
  address: string
  description: string
  rating: number
  image?: string
}

export default function TourPersonalizadoPage() {
  const router = useRouter()
  const [step, setStep] = useState<'guide' | 'experiences' | 'recommendations' | 'summary'>('guide')
  const [selectedGuide, setSelectedGuide] = useState<typeof guides[0] | null>(null)
  const [selectedExperiences, setSelectedExperiences] = useState<Experience[]>([])
  const [selectedLocals, setSelectedLocals] = useState<Local[]>([])
  const [guideRecommendations, setGuideRecommendations] = useState<Local[]>([])

  useEffect(() => {
    if (selectedGuide) {
      const filtered = mockLocals.filter(local => local.guideId === selectedGuide.id)
      setGuideRecommendations(filtered)
    }
  }, [selectedGuide])

  const handleSelectGuide = (guide: typeof guides[0]) => {
    setSelectedGuide(guide)
    setSelectedExperiences([])
    setSelectedLocals([])
    setStep('experiences')
  }

  const toggleExperience = (exp: Experience) => {
    setSelectedExperiences(prev => {
      const exists = prev.find(e => e.id === exp.id)
      if (exists) {
        return prev.filter(e => e.id !== exp.id)
      }
      return [...prev, exp]
    })
  }

  const toggleLocal = (local: Local) => {
    setSelectedLocals(prev => {
      const exists = prev.find(l => l.id === local.id)
      if (exists) {
        return prev.filter(l => l.id !== local.id)
      }
      return [...prev, local]
    })
  }

  const calculateTotal = () => {
    const experiencesTotal = selectedExperiences.reduce((sum, exp) => sum + exp.price, 0)
    return experiencesTotal
  }

  const getTotalDuration = () => {
    const hours = selectedExperiences.reduce((sum, exp) => {
      const duration = parseInt(exp.duration)
      return sum + duration
    }, 0)
    return `${hours} horas`
  }

  const handleReservar = () => {
    if (!selectedGuide) return
    
    const customTour = {
      title: `Tour Personalizado con ${selectedGuide.name}`,
      image: selectedGuide.image,
      guide: selectedGuide.name,
      price: `$${calculateTotal()}`,
      rating: selectedGuide.rating,
      reviews: selectedGuide.reviews,
      duration: getTotalDuration(),
      category: "Tour Personalizado",
      experiences: selectedExperiences,
      recommendations: selectedLocals
    }
    
    const tourData = encodeURIComponent(JSON.stringify(customTour))
    router.push(`/turista/reservar?tour=${tourData}`)
  }

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'restaurante': return <Utensils className="w-4 h-4" />
      case 'cafetería': return <Coffee className="w-4 h-4" />
      case 'mercado': return <ShoppingBag className="w-4 h-4" />
      case 'museo': return <Home className="w-4 h-4" />
      default: return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Crear Tour Personalizado</h1>
        <p className="text-muted-foreground">Diseña tu experiencia perfecta paso a paso</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${step === 'guide' ? 'text-primary' : selectedGuide ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'guide' ? 'bg-primary text-primary-foreground' : selectedGuide ? 'bg-green-600 text-white' : 'bg-muted'}`}>
                {selectedGuide ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="text-sm font-medium">Seleccionar Guía</span>
            </div>
            <ChevronRight className="text-muted-foreground" />
            <div className={`flex items-center gap-2 ${step === 'experiences' ? 'text-primary' : selectedExperiences.length > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'experiences' ? 'bg-primary text-primary-foreground' : selectedExperiences.length > 0 ? 'bg-green-600 text-white' : 'bg-muted'}`}>
                {selectedExperiences.length > 0 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="text-sm font-medium">Experiencias</span>
            </div>
            <ChevronRight className="text-muted-foreground" />
            <div className={`flex items-center gap-2 ${step === 'recommendations' ? 'text-primary' : selectedLocals.length > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'recommendations' ? 'bg-primary text-primary-foreground' : selectedLocals.length > 0 ? 'bg-green-600 text-white' : 'bg-muted'}`}>
                {selectedLocals.length > 0 ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <span className="text-sm font-medium">Recomendaciones</span>
            </div>
            <ChevronRight className="text-muted-foreground" />
            <div className={`flex items-center gap-2 ${step === 'summary' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'summary' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                4
              </div>
              <span className="text-sm font-medium">Resumen</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Select Guide */}
      {step === 'guide' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Selecciona tu Guía</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSelectGuide(guide)}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={guide.image || "/placeholder.svg"} alt={guide.name} />
                      <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{guide.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        {guide.location}
                      </div>
                      <div className="flex items-center gap-3 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-semibold">{guide.rating}</span>
                          <span className="text-muted-foreground">({guide.reviews})</span>
                        </div>
                        <span className="text-muted-foreground">${guide.pricePerHour}/hora</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{guide.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {guide.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Experiences */}
      {step === 'experiences' && selectedGuide && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Experiencias con {selectedGuide.name}</h2>
              <p className="text-muted-foreground">Selecciona las actividades que deseas realizar</p>
            </div>
            <Button variant="outline" onClick={() => setStep('guide')}>
              Cambiar Guía
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {selectedGuide.experiences.map((exp) => {
              const isSelected = selectedExperiences.some(e => e.id === exp.id)
              return (
                <Card 
                  key={exp.id} 
                  className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
                  onClick={() => toggleExperience(exp)}
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img src={exp.image || "/placeholder.svg"} alt={exp.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3 bg-background/90">
                      {exp.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{exp.name}</CardTitle>
                    <CardDescription>{exp.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="font-bold text-primary">${exp.price} MXN</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => setStep('guide')}>
              Anterior
            </Button>
            <Button 
              onClick={() => setStep('recommendations')} 
              disabled={selectedExperiences.length === 0}
            >
              Continuar a Recomendaciones
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Select Recommendations */}
      {step === 'recommendations' && selectedGuide && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Recomendaciones de {selectedGuide.name}</h2>
              <p className="text-muted-foreground">Lugares donde {selectedGuide.name.split(' ')[0]} ha estado o recomienda</p>
            </div>
          </div>

          {guideRecommendations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Este guía aún no tiene recomendaciones registradas</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {guideRecommendations.map((local) => {
                const isSelected = selectedLocals.some(l => l.id === local.id)
                return (
                  <Card 
                    key={local.id}
                    className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
                    onClick={() => toggleLocal(local)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {local.image && (
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img src={local.image || "/placeholder.svg"} alt={local.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold">{local.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {getCategoryIcon(local.category)}
                                <span>{local.category}</span>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{local.address}</p>
                          <p className="text-sm mb-2">{local.description}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="text-sm font-semibold">{local.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => setStep('experiences')}>
              Anterior
            </Button>
            <Button onClick={() => setStep('summary')}>
              Ver Resumen
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 'summary' && selectedGuide && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Resumen de tu Tour Personalizado</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Guide Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Tu Guía</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedGuide.image || "/placeholder.svg"} alt={selectedGuide.name} />
                      <AvatarFallback>{selectedGuide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{selectedGuide.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {selectedGuide.location}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold">{selectedGuide.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedGuide.reviews} reseñas)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Experiences */}
              <Card>
                <CardHeader>
                  <CardTitle>Experiencias Seleccionadas ({selectedExperiences.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedExperiences.map((exp, index) => (
                    <div key={exp.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{exp.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{exp.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {exp.duration}
                            </div>
                            <Badge variant="secondary">{exp.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-bold">${exp.price}</div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleExperience(exp)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Selected Recommendations */}
              {selectedLocals.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Lugares Recomendados ({selectedLocals.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedLocals.map((local, index) => (
                      <div key={local.id}>
                        {index > 0 && <Separator className="my-4" />}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-3 flex-1">
                            {local.image && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                <img src={local.image || "/placeholder.svg"} alt={local.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold mb-1">{local.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                {getCategoryIcon(local.category)}
                                <span>{local.category}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{local.address}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleLocal(local)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Detalles del Tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duración Total</span>
                    <span className="font-semibold">{getTotalDuration()}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Experiencias</span>
                    <span className="font-semibold">{selectedExperiences.length}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lugares</span>
                    <span className="font-semibold">{selectedLocals.length}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">${calculateTotal()} MXN</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleReservar}
                    disabled={selectedExperiences.length === 0}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Reservar Tour
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setStep('experiences')}
                  >
                    Editar Tour
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
