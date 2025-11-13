import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { mockGuides } from "@/lib/mock-data"
import { Star, Leaf, Search, MapPin, Globe, Car, Bus, Shield } from "lucide-react"

export default function GuidesPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Explorar Guías Certificados</h1>
        <p className="text-lg text-muted-foreground">Encuentra el guía perfecto para tu próxima aventura</p>
      </div>

      {/* Search & Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Buscar por nombre, especialidad o idioma..." className="pl-10" />
            </div>
          </div>
          <Button variant="outline">
            <MapPin className="w-4 h-4 mr-2" />
            Filtrar por ubicación
          </Button>
          <Button variant="outline">
            <Leaf className="w-4 h-4 mr-2" />
            Solo eco-friendly
          </Button>
        </div>
      </Card>

      {/* Guides Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockGuides.map((guide) => (
          <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-56 bg-muted">
              <img src={guide.photo || "/placeholder.svg"} alt={guide.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 flex gap-2">
                {guide.verified && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Shield className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
                {guide.ecoFriendly && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-1">{guide.name}</h3>
              <p className="text-primary font-medium text-sm mb-3">{guide.specialty}</p>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{guide.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold">{guide.rating}</span>
                </div>
                <div className="text-muted-foreground">{guide.touristsGuided} tours</div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {guide.transportType === "propio" ? <Car className="w-4 h-4" /> : <Bus className="w-4 h-4" />}
                  <span className="text-xs capitalize">{guide.transportType}</span>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {guide.languages.map((lang, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href={`/dashboard/guides/${guide.id}`}>Ver Perfil Completo</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA for becoming a guide */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 border-primary/20">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-3">¿Quieres ser guía en TuriLink?</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Únete a nuestra comunidad de guías certificados y comparte tu pasión por tu ciudad con viajeros de todo el
            mundo
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard/guides/register">Registrarse como Guía</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
