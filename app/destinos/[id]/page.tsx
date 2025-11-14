import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Users, Calendar, Clock, Info, Camera, Compass, Waves, Mountain, Sun, Palmtree } from 'lucide-react'
import Link from "next/link"

// Mock data - En producción esto vendría de una base de datos
const destinationsData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Tulum",
    region: "Quintana Roo, México",
    rating: 4.9,
    totalReviews: 1247,
    guides: 52,
    tours: 145,
    image: "/tulum-mayan-ruins-beach-caribbean.jpg",
    description: "Ruinas mayas frente al mar Caribe",
    longDescription:
      "Tulum es una joya arqueológica única que combina historia milenaria con playas paradisíacas. Este sitio fortificado maya se encuentra estratégicamente ubicado sobre un acantilado con vistas al Mar Caribe, ofreciendo algunas de las vistas más icónicas de México.",
    history:
      "Tulum fue una de las últimas ciudades habitadas y construidas por los mayas, prosperando entre los siglos XIII y XV. Su nombre original era Zamá (que significa amanecer), y servía como un importante puerto comercial. La ciudad estaba protegida por murallas en tres de sus lados, mientras el cuarto lado daba al mar, lo que demuestra su importancia estratégica.",
    highlights: [
      "El Castillo - Principal estructura frente al mar",
      "Templo de los Frescos - Con murales mayas bien preservados",
      "Playas de arena blanca y aguas turquesas",
      "Cenotes cercanos como Gran Cenote y Dos Ojos",
      "Zona arqueológica amurallada",
      "Reserva de la Biosfera de Sian Ka'an",
    ],
    bestTime: "Noviembre a Abril (temporada seca)",
    duration: "3-4 horas para la zona arqueológica",
    difficulty: "Fácil",
    activities: [
      { icon: "Camera", name: "Fotografía", popular: true },
      { icon: "Compass", name: "Arqueología", popular: true },
      { icon: "Waves", name: "Playa", popular: true },
      { icon: "Sun", name: "Snorkel", popular: false },
    ],
    topGuides: [
      {
        id: 1,
        name: "María Elena Ceh",
        rating: 4.9,
        tours: 12,
        image: "/mexican-female-tour-guide-mayan-ruins.jpg",
      },
    ],
    reviews: [
      {
        name: "Sophie Laurent",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "Absolutely stunning! The combination of Mayan ruins and Caribbean beach is breathtaking. Go early in the morning to avoid crowds.",
        country: "Francia",
      },
      {
        name: "Carlos Ramírez",
        rating: 5,
        date: "Hace 2 semanas",
        comment:
          "Impresionante la combinación de historia y naturaleza. Las vistas desde El Castillo son increíbles. Muy recomendable contratar un guía.",
        country: "México",
      },
      {
        name: "John Williams",
        rating: 4,
        date: "Hace 1 mes",
        comment:
          "Beautiful ruins with amazing ocean views. Can get crowded around midday. The beach at the bottom is perfect for a swim after exploring.",
        country: "USA",
      },
    ],
    practicalInfo: {
      entrance: "$95 MXN (Zona Arqueológica)",
      parking: "$150 MXN",
      hours: "8:00 AM - 5:00 PM",
      facilities: ["Baños", "Estacionamiento", "Tienda de souvenirs", "Área de descanso"],
    },
  },
  "2": {
    id: 2,
    name: "Playa del Carmen",
    region: "Quintana Roo, México",
    rating: 4.8,
    totalReviews: 2103,
    guides: 48,
    tours: 132,
    image: "/playa-del-carmen-quinta-avenida-beach.jpg",
    description: "Playas paradisíacas y vida cosmopolita",
    longDescription:
      "Playa del Carmen es el corazón cosmopolita de la Riviera Maya. Esta vibrante ciudad costera combina perfectamente playas de ensueño con una animada vida nocturna, restaurantes de clase mundial y acceso a las mejores atracciones de Quintana Roo.",
    history:
      "Originalmente un pequeño pueblo de pescadores maya llamado Xaman-Há, Playa del Carmen experimentó una transformación dramática en las últimas décadas. Desde los años 80, evolucionó de ser simplemente el embarcadero hacia Cozumel a convertirse en uno de los destinos turísticos más importantes del Caribe mexicano.",
    highlights: [
      "Quinta Avenida - Boulevard peatonal principal",
      "Playa Mamitas - Playa vibrante con clubs",
      "Parque Fundadores - Corazón cultural de la ciudad",
      "Ferry a Cozumel - Isla cercana",
      "Xaman-Ha - Ruinas mayas en el centro",
      "Parque Xcaret y Xplor cercanos",
    ],
    bestTime: "Todo el año (clima tropical)",
    duration: "2-3 días recomendados",
    difficulty: "Muy fácil",
    activities: [
      { icon: "Waves", name: "Playa", popular: true },
      { icon: "Sun", name: "Snorkel", popular: true },
      { icon: "Palmtree", name: "Vida Nocturna", popular: true },
      { icon: "Camera", name: "Compras", popular: false },
    ],
    topGuides: [
      {
        id: 2,
        name: "José Luis Cauich",
        rating: 5.0,
        tours: 8,
        image: "/mexican-male-tour-guide-caribbean-beach.jpg",
      },
    ],
    reviews: [
      {
        name: "Emma Johnson",
        rating: 5,
        date: "Hace 3 días",
        comment:
          "Perfect beach town! Great restaurants, beautiful beaches, and so many activities nearby. Quinta Avenida is amazing!",
        country: "Canada",
      },
      {
        name: "Luis González",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "Excelente destino para toda la familia. Hay opciones para todos los gustos y edades. Las playas son espectaculares.",
        country: "España",
      },
    ],
    practicalInfo: {
      entrance: "Gratis (playas públicas)",
      parking: "$50-100 MXN",
      hours: "24/7",
      facilities: ["Múltiples hoteles", "Restaurantes", "Tiendas", "Cajeros", "Hospitales"],
    },
  },
  "3": {
    id: 3,
    name: "Isla Mujeres",
    region: "Quintana Roo, México",
    rating: 4.9,
    totalReviews: 987,
    guides: 35,
    tours: 98,
    image: "/isla-mujeres-turquoise-water-caribbean.jpg",
    description: "Paraíso isleño con aguas turquesa",
    longDescription:
      "Isla Mujeres es una pequeña isla paradisíaca ubicada frente a las costas de Cancún. Con sus aguas cristalinas color turquesa, playas de arena blanca y un ambiente relajado, es el escape perfecto del bullicio del continente.",
    history:
      "Su nombre proviene de las figuras femeninas dedicadas a Ixchel, diosa maya de la fertilidad, que fueron encontradas por los conquistadores españoles. La isla fue un importante santuario maya y posteriormente un refugio de piratas en la época colonial. Hoy en día, mantiene su encanto caribeño mientras ofrece todas las comodidades modernas.",
    highlights: [
      "Playa Norte - Una de las mejores playas del mundo",
      "Punta Sur - Acantilados y santuario de Ixchel",
      "Centro histórico encantador",
      "Snorkel con tortugas marinas",
      "Museo Subacuático MUSA",
      "Tiburón ballena (temporada mayo-septiembre)",
    ],
    bestTime: "Diciembre a Abril",
    duration: "1-2 días",
    difficulty: "Muy fácil",
    activities: [
      { icon: "Waves", name: "Playa", popular: true },
      { icon: "Sun", name: "Snorkel", popular: true },
      { icon: "Camera", name: "Fotografía", popular: true },
      { icon: "Compass", name: "Carrito de golf", popular: false },
    ],
    topGuides: [],
    reviews: [
      {
        name: "Anna Schmidt",
        rating: 5,
        date: "Hace 5 días",
        comment:
          "Eine wunderschöne Insel! Playa Norte ist fantastisch. Perfect für einen entspannten Tag am Strand.",
        country: "Alemania",
      },
      {
        name: "Patricia Morales",
        rating: 5,
        date: "Hace 2 semanas",
        comment: "Un paraíso cerca de Cancún. El agua es increíblemente clara y la isla tiene un ambiente muy tranquilo.",
        country: "Argentina",
      },
    ],
    practicalInfo: {
      entrance: "Gratis",
      parking: "N/A (se llega en ferry)",
      hours: "24/7",
      facilities: ["Ferry desde Cancún", "Renta de carritos de golf", "Restaurantes", "Hoteles boutique"],
    },
  },
  "4": {
    id: 4,
    name: "Bacalar",
    region: "Quintana Roo, México",
    rating: 5.0,
    totalReviews: 654,
    guides: 28,
    tours: 76,
    image: "/bacalar-lagoon-seven-colors-mexico.jpg",
    description: "Laguna de los siete colores",
    longDescription:
      "Bacalar es hogar de la espectacular Laguna de los Siete Colores, una maravilla natural de agua dulce con tonalidades que van del azul turquesa al azul profundo. Este destino mágico ofrece una alternativa más tranquila y natural al turismo de playa del Caribe.",
    history:
      "Fundada por los mayas, Bacalar fue un importante centro comercial. Su fuerte colonial, el Fuerte de San Felipe, fue construido en 1733 para defender la zona de los ataques piratas británicos. La laguna ha sido sagrada para los mayas durante siglos, y hoy en día se trabaja arduamente para preservar su delicado ecosistema, especialmente los estromatolitos, estructuras vivas de más de 3,500 años de antigüedad.",
    highlights: [
      "Laguna de Siete Colores",
      "Fuerte de San Felipe (museo)",
      "Cenote Azul - Cenote abierto muy profundo",
      "Estromatolitos - Organismos vivos ancestrales",
      "Canal de los Piratas",
      "Isla de los Pájaros",
    ],
    bestTime: "Noviembre a Abril",
    duration: "2-3 días",
    difficulty: "Fácil",
    activities: [
      { icon: "Waves", name: "Kayak", popular: true },
      { icon: "Sun", name: "Natación", popular: true },
      { icon: "Camera", name: "Fotografía", popular: true },
      { icon: "Compass", name: "Paddle board", popular: false },
    ],
    topGuides: [
      {
        id: 3,
        name: "Gabriela Poot",
        rating: 4.8,
        tours: 15,
        image: "/mexican-female-guide-lagoon-bacalar.jpg",
      },
    ],
    reviews: [
      {
        name: "Marco Rossi",
        rating: 5,
        date: "Hace 4 días",
        comment:
          "Incredibile! I colori dell'acqua sono reali, non è photoshop! Un posto magico e molto tranquillo.",
        country: "Italia",
      },
      {
        name: "Jennifer Lee",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "Hidden gem! The lagoon is absolutely stunning. Much more peaceful than Tulum or Playa. Highly recommend!",
        country: "USA",
      },
    ],
    practicalInfo: {
      entrance: "Gratis (acceso público a la laguna)",
      parking: "$50 MXN en algunos puntos",
      hours: "Amanecer a atardecer",
      facilities: ["Restaurantes", "Hoteles boutique", "Balnearios", "Renta de kayaks"],
    },
  },
  "5": {
    id: 5,
    name: "Cozumel",
    region: "Quintana Roo, México",
    rating: 4.8,
    totalReviews: 1532,
    guides: 41,
    tours: 115,
    image: "/cozumel-island-coral-reef-diving.jpg",
    description: "Paraíso del buceo y arrecifes",
    longDescription:
      "Cozumel es la isla más grande del Caribe mexicano y uno de los mejores destinos de buceo del mundo. Sus arrecifes de coral forman parte del Gran Arrecife Maya, el segundo sistema de arrecifes más grande del planeta.",
    history:
      "Para los mayas, Cozumel era un importante centro de peregrinación dedicado a Ixchel, diosa de la luna y la fertilidad. Durante la época colonial, fue refugio de piratas. En el siglo XX, Jacques Cousteau la dio a conocer mundialmente al documentar sus espectaculares arrecifes de coral, convirtiéndola en un destino de buceo de clase mundial.",
    highlights: [
      "Arrecife Palancar - Buceo de clase mundial",
      "Parque Chankanaab",
      "San Gervasio - Ruinas mayas",
      "Playa Paradise",
      "El Cielo - Nadar con estrellas de mar",
      "Centro de San Miguel",
    ],
    bestTime: "Todo el año para buceo",
    duration: "2-4 días",
    difficulty: "Moderada (por actividades acuáticas)",
    activities: [
      { icon: "Waves", name: "Buceo", popular: true },
      { icon: "Sun", name: "Snorkel", popular: true },
      { icon: "Camera", name: "Fotografía submarina", popular: true },
      { icon: "Palmtree", name: "Playa", popular: false },
    ],
    topGuides: [],
    reviews: [
      {
        name: "Michael Anderson",
        rating: 5,
        date: "Hace 2 días",
        comment:
          "Best diving I've ever experienced! The coral reefs are pristine and full of marine life. Paradise for divers!",
        country: "USA",
      },
    ],
    practicalInfo: {
      entrance: "Ferry desde Playa del Carmen ($400 MXN aprox)",
      parking: "N/A (isla)",
      hours: "24/7",
      facilities: ["Multiple dive shops", "Restaurantes", "Hoteles", "Renta de autos/motos"],
    },
  },
  "6": {
    id: 6,
    name: "Holbox",
    region: "Quintana Roo, México",
    rating: 4.9,
    totalReviews: 756,
    guides: 32,
    tours: 82,
    image: "/holbox-island-beach-bioluminescence.jpg",
    description: "Isla virgen y bioluminiscencia",
    longDescription:
      "Holbox es una isla paradisíaca donde no hay autos, solo carritos de golf y bicicletas. Este santuario natural ofrece playas vírgenes, espectacular bioluminiscencia nocturna y la oportunidad de nadar con tiburones ballena.",
    history:
      "El nombre Holbox proviene del maya 'Yol Box' que significa 'hoyo negro', probablemente refiriéndose a sus manantiales de agua dulce o a las aguas oscuras donde se encuentra con el Golfo de México. Históricamente fue habitada por pescadores mayas y permaneció relativamente desconocida hasta principios del siglo XXI. Su desarrollo ha sido cuidadoso para mantener su ambiente natural y relajado.",
    highlights: [
      "Tiburón ballena (junio-septiembre)",
      "Bioluminiscencia nocturna",
      "Flamingos en Yalahau",
      "Playas vírgenes infinitas",
      "Isla Pájaros",
      "Sin automóviles - solo carritos de golf",
    ],
    bestTime: "Junio a Septiembre (tiburón ballena)",
    duration: "2-3 días",
    difficulty: "Fácil",
    activities: [
      { icon: "Waves", name: "Tiburón ballena", popular: true },
      { icon: "Camera", name: "Bioluminiscencia", popular: true },
      { icon: "Palmtree", name: "Playa", popular: true },
      { icon: "Sun", name: "Kayak", popular: false },
    ],
    topGuides: [],
    reviews: [
      {
        name: "Claire Dubois",
        rating: 5,
        date: "Hace 1 semana",
        comment:
          "Magnifique! L'île est un petit paradis. Nager avec les requins-baleines était incroyable. Très relaxant!",
        country: "Francia",
      },
    ],
    practicalInfo: {
      entrance: "Ferry desde Chiquilá ($200 MXN aprox)",
      parking: "En Chiquilá ($100 MXN/día)",
      hours: "24/7",
      facilities: ["Renta de carritos de golf", "Hoteles boutique", "Restaurantes", "Tours"],
    },
  },
}

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const destination = destinationsData[id]

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destino no encontrado</h1>
          <Button asChild>
            <Link href="/">Ver todos los destinos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <img src={destination.image || "/placeholder.svg"} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white space-y-4">
            <Badge className="bg-primary text-primary-foreground mb-2">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {destination.rating} • {destination.totalReviews} reseñas
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center gap-2 text-xl">
              <MapPin className="w-5 h-5" />
              {destination.region}
            </div>
            <p className="text-xl md:text-2xl opacity-90">{destination.description}</p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{destination.guides} guías disponibles</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
                <span>{destination.tours} tours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Acerca de {destination.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{destination.longDescription}</p>
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="w-5 h-5" />
                  Historia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{destination.history}</p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Lugares Destacados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {destination.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="w-5 h-5" />
                  Actividades Principales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {destination.activities.map((activity: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 text-center ${
                        activity.popular ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        {activity.icon === "Camera" && <Camera className="w-8 h-8 text-primary" />}
                        {activity.icon === "Compass" && <Compass className="w-8 h-8 text-primary" />}
                        {activity.icon === "Waves" && <Waves className="w-8 h-8 text-primary" />}
                        {activity.icon === "Sun" && <Sun className="w-8 h-8 text-primary" />}
                        {activity.icon === "Palmtree" && <Palmtree className="w-8 h-8 text-primary" />}
                      </div>
                      <p className="font-medium text-sm">{activity.name}</p>
                      {activity.popular && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Guides */}
            {destination.topGuides.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Guías Destacados en {destination.name}</CardTitle>
                    <Button variant="outline" asChild size="sm">
                      <Link href="/guias">Ver Todos</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {destination.topGuides.map((guide: any) => (
                      <Link key={guide.id} href={`/guias/${guide.id}`}>
                        <div className="flex items-center gap-4 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={guide.image || "/placeholder.svg"} alt={guide.name} />
                            <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{guide.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-accent text-accent" />
                                {guide.rating}
                              </div>
                              <span>{guide.tours} tours</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver Perfil
                          </Button>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reseñas de Visitantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {destination.reviews.map((review: any, index: number) => (
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
                            <p className="text-sm text-muted-foreground">
                              {review.country} • {review.date}
                            </p>
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
                  Ver todas las reseñas ({destination.totalReviews})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Información Práctica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mejor época</p>
                    <p className="font-medium">{destination.bestTime}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duración recomendada</p>
                    <p className="font-medium">{destination.duration}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Mountain className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Dificultad</p>
                    <p className="font-medium">{destination.difficulty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practical Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles Prácticos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Entrada</p>
                  <p className="font-medium">{destination.practicalInfo.entrance}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estacionamiento</p>
                  <p className="font-medium">{destination.practicalInfo.parking}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Horario</p>
                  <p className="font-medium">{destination.practicalInfo.hours}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Servicios disponibles</p>
                  <div className="flex flex-wrap gap-2">
                    {destination.practicalInfo.facilities.map((facility: string) => (
                      <Badge key={facility} variant="outline">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg">¿Listo para explorar?</h3>
                <p className="text-sm opacity-90">
                  Encuentra al guía perfecto para tu experiencia en {destination.name}
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/guias">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Guías Disponibles
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
