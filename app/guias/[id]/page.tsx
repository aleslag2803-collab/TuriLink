import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Globe, Calendar, Clock, Award, MessageCircle, Shield, Languages, Users, ThumbsUp } from 'lucide-react'
import Link from "next/link"

// Mock data - En producción esto vendría de una base de datos
const guidesData: Record<string, any> = {
  "1": {
    id: 1,
    name: "María Elena Ceh",
    location: "Tulum, Quintana Roo",
    nationality: "Mexicana",
    rating: 4.9,
    reviews: 234,
    totalTours: 12,
    completedTours: 487,
    yearsExperience: 8,
    image: "/mexican-female-tour-guide-mayan-ruins.jpg",
    verified: true,
    languages: ["Español", "Inglés", "Maya"],
    specialties: ["Historia Maya", "Cenotes", "Ecología", "Arqueología"],
    about:
      "Guía turística certificada con raíces mayas. Mi pasión es compartir la rica historia y cultura de mis ancestros mientras exploramos los lugares más mágicos de Quintana Roo. Estudié Arqueología en la UNAM y he dedicado los últimos 8 años a mostrar las maravillas de Tulum y sus alrededores.",
    availability: {
      days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      hours: "8:00 AM - 6:00 PM",
    },
    tourTypes: [
      {
        name: "Tour Privado Ruinas de Tulum",
        duration: "3 horas",
        price: "$1,200 MXN",
        rating: 5.0,
      },
      {
        name: "Experiencia Cenotes Sagrados",
        duration: "5 horas",
        price: "$1,800 MXN",
        rating: 4.9,
      },
      {
        name: "Tour Ecológico Sian Ka'an",
        duration: "8 horas",
        price: "$2,500 MXN",
        rating: 4.8,
      },
    ],
    recentReviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        date: "Hace 2 semanas",
        comment:
          "María Elena fue una guía excepcional. Su conocimiento de la historia maya es impresionante y hace que todo cobre vida. ¡Altamente recomendada!",
      },
      {
        name: "Carlos Mendoza",
        rating: 5,
        date: "Hace 1 mes",
        comment:
          "El tour de cenotes fue una experiencia inolvidable. María conoce los mejores lugares y nos contó historias fascinantes sobre cada sitio.",
      },
      {
        name: "Emma Schmidt",
        rating: 4,
        date: "Hace 2 meses",
        comment:
          "Excelente tour por Tulum. María es muy profesional y apasionada por lo que hace. Solo hubiera deseado que durara más tiempo.",
      },
    ],
  },
  "2": {
    id: 2,
    name: "José Luis Cauich",
    location: "Playa del Carmen, Quintana Roo",
    nationality: "Mexicano",
    rating: 5.0,
    reviews: 189,
    totalTours: 8,
    completedTours: 356,
    yearsExperience: 6,
    image: "/mexican-male-tour-guide-caribbean-beach.jpg",
    verified: true,
    languages: ["Español", "Inglés", "Francés"],
    specialties: ["Snorkel", "Cultura Maya", "Gastronomía", "Deportes Acuáticos"],
    about:
      "Soy instructor de buceo certificado y guía gastronómico. Me encanta combinar aventuras acuáticas con experiencias culinarias auténticas. Nací y crecí en Playa del Carmen, conozco cada rincón del Caribe mexicano.",
    availability: {
      days: ["Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      hours: "7:00 AM - 5:00 PM",
    },
    tourTypes: [
      {
        name: "Snorkel en Arrecifes + Comida Local",
        duration: "6 horas",
        price: "$2,000 MXN",
        rating: 5.0,
      },
      {
        name: "Tour Gastronómico Playa del Carmen",
        duration: "4 horas",
        price: "$1,500 MXN",
        rating: 5.0,
      },
    ],
    recentReviews: [
      {
        name: "Michel Dubois",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "José Luis est incroyable! Le snorkeling était magnifique et la nourriture délicieuse. Merci pour tout!",
      },
      {
        name: "Lisa Anderson",
        rating: 5,
        date: "Hace 3 semanas",
        comment: "Best tour guide ever! The food tour was amazing and José knows all the hidden gems.",
      },
    ],
  },
  "3": {
    id: 3,
    name: "Gabriela Poot",
    location: "Bacalar, Quintana Roo",
    nationality: "Mexicana",
    rating: 4.8,
    reviews: 312,
    totalTours: 15,
    completedTours: 621,
    yearsExperience: 10,
    image: "/mexican-female-guide-lagoon-bacalar.jpg",
    verified: true,
    languages: ["Español", "Inglés", "Maya"],
    specialties: ["Laguna", "Naturaleza", "Kayak", "Fotografía"],
    about:
      "Bióloga marina y fotógrafa profesional. La Laguna de Bacalar es mi segundo hogar y me dedico a protegerla mientras comparto su belleza con visitantes responsables. Especializada en eco-turismo y conservación.",
    availability: {
      days: ["Lunes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      hours: "6:00 AM - 4:00 PM",
    },
    tourTypes: [
      {
        name: "Tour Kayak Laguna 7 Colores",
        duration: "4 horas",
        price: "$1,600 MXN",
        rating: 4.9,
      },
      {
        name: "Amanecer en Bacalar + Fotografía",
        duration: "3 horas",
        price: "$1,400 MXN",
        rating: 4.8,
      },
      {
        name: "Experiencia Completa Bacalar",
        duration: "8 horas",
        price: "$2,800 MXN",
        rating: 4.9,
      },
    ],
    recentReviews: [
      {
        name: "Robert Smith",
        rating: 5,
        date: "Hace 5 días",
        comment:
          "Gabriela's passion for Bacalar is contagious. The kayak tour was peaceful and she took amazing photos of us!",
      },
      {
        name: "Ana Martínez",
        rating: 5,
        date: "Hace 2 semanas",
        comment: "Una experiencia mágica. Gabriela conoce cada rincón de la laguna y cuida mucho el medio ambiente.",
      },
    ],
  },
  "4": {
    id: 4,
    name: "Roberto May",
    location: "Felipe Carrillo Puerto, Quintana Roo",
    nationality: "Mexicano",
    rating: 4.9,
    reviews: 167,
    totalTours: 10,
    completedTours: 298,
    yearsExperience: 12,
    image: "/mexican-indigenous-male-guide-jungle.jpg",
    verified: true,
    languages: ["Español", "Maya", "Inglés"],
    specialties: ["Comunidades Mayas", "Artesanías", "Selva", "Etnografía"],
    about:
      "Descendiente directo de la cultura maya. Trabajo con comunidades locales para ofrecer experiencias auténticas y respetuosas. Mi misión es preservar nuestras tradiciones mientras generamos oportunidades económicas justas.",
    availability: {
      days: ["Lunes", "Martes", "Jueves", "Viernes", "Sábado"],
      hours: "8:00 AM - 5:00 PM",
    },
    tourTypes: [
      {
        name: "Visita a Comunidades Mayas",
        duration: "6 horas",
        price: "$1,800 MXN",
        rating: 5.0,
      },
      {
        name: "Taller de Artesanías Tradicionales",
        duration: "4 horas",
        price: "$1,200 MXN",
        rating: 4.9,
      },
      {
        name: "Expedición Selva Maya",
        duration: "8 horas",
        price: "$2,200 MXN",
        rating: 4.8,
      },
    ],
    recentReviews: [
      {
        name: "David Thompson",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "Roberto provided an authentic cultural experience. His connection to the Mayan communities is genuine and inspiring.",
      },
      {
        name: "Isabella Rossi",
        rating: 5,
        date: "Hace 3 semanas",
        comment: "Un'esperienza indimenticabile! Roberto è un narratore eccezionale della cultura maya.",
      },
    ],
  },
}

export default async function GuideProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const guide = guidesData[id]

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guía no encontrado</h1>
          <Button asChild>
            <Link href="/guias">Ver todos los guías</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-6 items-end w-full">
            <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
              <AvatarImage src={guide.image || "/placeholder.svg"} alt={guide.name} />
              <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{guide.name}</h1>
                {guide.verified && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Shield className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{guide.location}</span>
                <span>•</span>
                <Globe className="w-4 h-4" />
                <span>{guide.nationality}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="text-2xl font-bold">{guide.rating}</span>
                  <span className="text-muted-foreground">({guide.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-medium">{guide.completedTours} tours completados</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="md:mb-0">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar Guía
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acerca de {guide.name.split(" ")[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{guide.about}</p>

                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty: string) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tours Offered */}
            <Card>
              <CardHeader>
                <CardTitle>Tours y Experiencias ({guide.totalTours})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {guide.tourTypes.map((tour: any, index: number) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{tour.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {tour.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            {tour.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg mb-2">{tour.price}</div>
                        <Button size="sm" variant="outline">
                          Reservar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reseñas Recientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {guide.recentReviews.map((review: any, index: number) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{review.name}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  Ver todas las reseñas ({guide.reviews})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Guía</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Idiomas</p>
                    <p className="font-medium">{guide.languages.join(", ")}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Experiencia</p>
                    <p className="font-medium">{guide.yearsExperience} años</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tours completados</p>
                    <p className="font-medium">{guide.completedTours}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <ThumbsUp className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Recomendación</p>
                    <p className="font-medium">{Math.round(guide.rating * 20)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Días disponibles</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.availability.days.map((day: string) => (
                        <Badge key={day} variant="outline">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Horario</p>
                    <p className="font-medium">{guide.availability.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg">¿Listo para tu aventura?</h3>
                <p className="text-sm opacity-90">
                  Contacta a {guide.name.split(" ")[0]} para planear tu experiencia perfecta en Quintana Roo
                </p>
                <Button variant="secondary" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
