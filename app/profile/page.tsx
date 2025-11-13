import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Globe, MapPin, Edit, Heart, History, Star } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Mi Perfil</h1>
        <p className="text-lg text-muted-foreground">Gestiona tu información y preferencias</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <Card className="lg:col-span-1 p-6">
          <div className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage src="/turista-feliz.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-card-foreground mb-1">Juan Pérez</h2>
            <p className="text-muted-foreground mb-4">Viajero Frecuente</p>
            <Badge className="mb-6">Miembro desde Enero 2024</Badge>
            <Button className="w-full">
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>juan.perez@email.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+52 555 123 4567</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Español, Inglés</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Ciudad de México</span>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Tours realizados</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Favoritos</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Calificación</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Preferences */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Preferencias de Viaje</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Cultura & Historia</Badge>
              <Badge variant="secondary">Gastronomía Local</Badge>
              <Badge variant="secondary">Ecoturismo</Badge>
              <Badge variant="secondary">Aventura</Badge>
            </div>
          </Card>

          {/* Recent Tours */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Tours Recientes</h2>
            <div className="space-y-4">
              {[
                {
                  guide: "Carlos Méndez",
                  tour: "Tour Histórico del Centro",
                  date: "Marzo 15, 2024",
                  rating: 5,
                },
                {
                  guide: "María González",
                  tour: "Aventura en la Sierra",
                  date: "Febrero 28, 2024",
                  rating: 5,
                },
                {
                  guide: "José Ramírez",
                  tour: "Tour Gastronómico",
                  date: "Febrero 10, 2024",
                  rating: 4,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{item.guide.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-card-foreground">{item.tour}</p>
                      <p className="text-sm text-muted-foreground">con {item.guide}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
