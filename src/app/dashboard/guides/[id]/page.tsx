import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockGuides } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Star, Phone, Mail, Globe, Car, Bus, Shield, Leaf, Users, Calendar, MessageCircle } from "lucide-react"

export default function GuideDetailPage({ params }: { params: { id: string } }) {
  const guide = mockGuides.find((g) => g.id === params.id)

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0 bg-muted">
          <img
            src={guide.photo || "/placeholder.svg"}
            alt={guide.name}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-6 lg:px-10 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <Avatar className="w-32 h-32 border-4 border-card">
                <AvatarImage src={guide.photo || "/placeholder.svg"} alt={guide.name} />
                <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {guide.verified && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                  {guide.ecoFriendly && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Leaf className="w-3 h-3 mr-1" />
                      Eco-friendly
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{guide.name}</h1>
                <p className="text-xl text-primary font-medium">{guide.specialty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Sobre mí</h2>
              <p className="text-muted-foreground leading-relaxed">{guide.description}</p>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Estadísticas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{guide.touristsGuided}</p>
                    <p className="text-sm text-muted-foreground">Turistas guiados</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">{guide.rating}</p>
                    <p className="text-sm text-muted-foreground">Calificación</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">10+</p>
                    <p className="text-sm text-muted-foreground">Años experiencia</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Languages & Transport */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Servicios</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-card-foreground mb-2">Idiomas</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.languages.map((lang, i) => (
                        <Badge key={i} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {guide.transportType === "propio" ? (
                    <Car className="w-5 h-5 text-primary mt-0.5" />
                  ) : (
                    <Bus className="w-5 h-5 text-primary mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">Transporte</p>
                    <p className="text-muted-foreground capitalize">{guide.transportType}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reviews Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Reseñas</h2>
              <div className="space-y-6">
                {/* Mock Reviews */}
                {[
                  {
                    name: "Ana Martínez",
                    rating: 5,
                    date: "Hace 2 semanas",
                    comment:
                      "Excelente guía! Carlos conoce cada rincón de la ciudad y sus historias son fascinantes. Totalmente recomendado.",
                  },
                  {
                    name: "John Smith",
                    rating: 5,
                    date: "Hace 1 mes",
                    comment: "Amazing experience! Very knowledgeable and friendly. Made our trip unforgettable.",
                  },
                  {
                    name: "Pierre Dubois",
                    rating: 4,
                    date: "Hace 2 meses",
                    comment: "Très bon guide, très professionnel. Je recommande vivement!",
                  },
                ].map((review, i) => (
                  <div key={i} className="border-b border-border last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-card-foreground">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="p-6 sticky top-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-card-foreground mb-1">$45 USD</p>
                <p className="text-muted-foreground">por hora</p>
              </div>

              <div className="space-y-3 mb-6">
                <Button asChild className="w-full" size="lg">
                  <Link href="/dashboard/payments">Contratar Ahora</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{guide.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{guide.email}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  ✓ Cancelación gratuita 24h antes
                  <br />✓ Pago seguro
                  <br />✓ Soporte 24/7
                </p>
              </div>
            </Card>

            {/* Safety Info */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-card-foreground mb-2">Guía Verificado</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Este guía ha sido verificado con documentación oficial y cumple con todos nuestros estándares de
                    calidad.
                  </p>
                </div>
              </div>
            </Card>

            {/* Eco Badge */}
            {guide.ecoFriendly && (
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <Leaf className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">Compromiso Sostenible</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Este guía promueve prácticas de turismo sostenible y respeta el medio ambiente.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
