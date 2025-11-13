// Datos simulados para la aplicación

export interface Guide {
  id: string
  name: string
  photo: string
  specialty: string
  description: string
  languages: string[]
  transportType: "propio" | "publico"
  phone: string
  email: string
  touristsGuided: number
  rating: number
  reviews: Review[]
  verified: boolean
  ecoFriendly: boolean
  documents: {
    id: string
    certificate: string
  }
}

export interface Tourist {
  id: string
  name: string
  photo: string
  email: string
  phone: string
  language: string
  preferences: string[]
  guidesHired: string[]
  subscriptionActive: boolean
}

export interface Local {
  id: string
  name: string
  description: string
  type: "restaurant" | "natural" | "cultural" | "adventure"
  location: {
    lat: number
    lon: number
    address: string
  }
  ecoFriendly: boolean
  rating: number
  reviews: Review[]
  images: string[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  userPhoto: string
  rating: number
  comment: string
  date: string
}

// Mock Guides
export const mockGuides: Guide[] = [
  {
    id: "1",
    name: "Carlos Méndez",
    photo: "/guia-turistico-profesional.jpg",
    specialty: "Cultura & Historia",
    description:
      "Historiador apasionado con 10 años de experiencia guiando turistas por sitios arqueológicos y museos. Especializado en historia precolombina y colonial.",
    languages: ["Español", "Inglés", "Francés"],
    transportType: "propio",
    phone: "+52 555 123 4567",
    email: "carlos.mendez@turilink.com",
    touristsGuided: 234,
    rating: 4.9,
    reviews: [],
    verified: true,
    ecoFriendly: true,
    documents: {
      id: "INE123456",
      certificate: "CERT-TOUR-2023-001",
    },
  },
  {
    id: "2",
    name: "María González",
    photo: "/guia-turistica-aventura.jpg",
    specialty: "Aventura & Naturaleza",
    description:
      "Guía certificada en ecoturismo y actividades al aire libre. Experta en senderismo, rappel y observación de fauna silvestre.",
    languages: ["Español", "Inglés"],
    transportType: "propio",
    phone: "+52 555 234 5678",
    email: "maria.gonzalez@turilink.com",
    touristsGuided: 156,
    rating: 5.0,
    reviews: [],
    verified: true,
    ecoFriendly: true,
    documents: {
      id: "INE234567",
      certificate: "CERT-ECO-2023-002",
    },
  },
  {
    id: "3",
    name: "José Ramírez",
    photo: "/chef-guia-gastronomico.jpg",
    specialty: "Gastronomía Local",
    description:
      "Chef profesional y guía gastronómico. Te llevaré a descubrir los mejores sabores locales, mercados tradicionales y restaurantes escondidos.",
    languages: ["Español", "Inglés", "Italiano"],
    transportType: "publico",
    phone: "+52 555 345 6789",
    email: "jose.ramirez@turilink.com",
    touristsGuided: 189,
    rating: 4.8,
    reviews: [],
    verified: true,
    ecoFriendly: true,
    documents: {
      id: "INE345678",
      certificate: "CERT-GAST-2023-003",
    },
  },
  {
    id: "4",
    name: "Lucía Herrera",
    photo: "/guia-ecologica.jpg",
    specialty: "Ecoturismo & Fauna",
    description:
      "Bióloga y guía ambiental con enfoque en conservación. Organiza recorridos por reservas naturales y programas de educación ambiental.",
    languages: ["Español", "Inglés", "Alemán"],
    transportType: "propio",
    phone: "+52 555 456 7890",
    email: "lucia.herrera@turilink.com",
    touristsGuided: 210,
    rating: 4.9,
    reviews: [],
    verified: true,
    ecoFriendly: true,
    documents: {
      id: "INE456789",
      certificate: "CERT-ECO-2023-004",
    },
  },
  {
    id: "5",
    name: "Fernando López",
    photo: "/guia-arqueologico.jpg",
    specialty: "Sitios Arqueológicos",
    description:
      "Arqueólogo con más de 12 años guiando visitas a zonas mayas y aztecas. Conocedor de mitología y costumbres ancestrales.",
    languages: ["Español", "Inglés"],
    transportType: "publico",
    phone: "+52 555 567 8901",
    email: "fernando.lopez@turilink.com",
    touristsGuided: 298,
    rating: 4.7,
    reviews: [],
    verified: true,
    ecoFriendly: false,
    documents: {
      id: "INE567890",
      certificate: "CERT-ARC-2023-005",
    },
  },
  {
    id: "6",
    name: "Ana Torres",
    photo: "/guia-fotografica.jpg",
    specialty: "Fotografía & Naturaleza",
    description:
      "Apasionada por la fotografía de paisajes y fauna. Ofrece recorridos personalizados para capturar la belleza natural del país.",
    languages: ["Español", "Inglés", "Portugués"],
    transportType: "propio",
    phone: "+52 555 678 9012",
    email: "ana.torres@turilink.com",
    touristsGuided: 134,
    rating: 4.8,
    reviews: [],
    verified: true,
    ecoFriendly: true,
    documents: {
      id: "INE678901",
      certificate: "CERT-FOTO-2023-006",
    },
  },
  {
    id: "7",
    name: "Miguel Castillo",
    photo: "/guia-extremo.jpg",
    specialty: "Deportes Extremos",
    description:
      "Instructor certificado en rafting, escalada y ciclismo de montaña. Fomenta la seguridad y la conexión con la naturaleza.",
    languages: ["Español", "Inglés"],
    transportType: "propio",
    phone: "+52 555 789 0123",
    email: "miguel.castillo@turilink.com",
    touristsGuided: 176,
    rating: 4.9,
    reviews: [],
    verified: true,
    ecoFriendly: true,
    documents: {
      id: "INE789012",
      certificate: "CERT-ADV-2023-007",
    },
  },
  {
    id: "8",
    name: "Verónica Díaz",
    photo: "/guia-cultural.jpg",
    specialty: "Arte & Cultura Moderna",
    description:
      "Curadora de arte y guía de galerías urbanas. Te mostrará los espacios más innovadores de arte contemporáneo y muralismo.",
    languages: ["Español", "Francés", "Inglés"],
    transportType: "publico",
    phone: "+52 555 890 1234",
    email: "veronica.diaz@turilink.com",
    touristsGuided: 145,
    rating: 4.6,
    reviews: [],
    verified: true,
    ecoFriendly: false,
    documents: {
      id: "INE890123",
      certificate: "CERT-ART-2023-008",
    },
  },
  {
    id: "9",
    name: "Santiago Rivera",
    photo: "/guia-aventura-acuatica.jpg",
    specialty: "Aventura Acuática",
    description:
      "Guía especializado en kayak, buceo y esnórquel. Con amplia experiencia en zonas costeras y arrecifes del Caribe mexicano.",
    languages: ["Español", "Inglés"],
    transportType: "propio",
    phone: "+52 555 901 2345",
    email: "santiago.rivera@turilink.com",
    touristsGuided: 203,
    rating: 5.0,
    reviews: [],
    verified: true,
    ecoFriendly: true,
    documents: {
      id: "INE901234",
      certificate: "CERT-AQUA-2023-009",
    },
  },
]

// Mock Locals
export const mockLocals: Local[] = [
  {
    id: "1",
    name: "Restaurante El Sabor Ancestral",
    description:
      "Restaurante familiar que ofrece cocina tradicional con ingredientes orgánicos de productores locales. Ambiente acogedor y auténtico.",
    type: "restaurant",
    location: {
      lat: 19.4326,
      lon: -99.1332,
      address: "Calle Hidalgo 123, Centro Histórico",
    },
    ecoFriendly: true,
    rating: 4.7,
    reviews: [],
    images: ["/traditional-mexican-restaurant.png"],
  },
  {
    id: "2",
    name: "Cascadas de Agua Azul",
    description:
      "Impresionantes cascadas de color turquesa rodeadas de selva tropical. Ideal para natación y fotografía de naturaleza.",
    type: "natural",
    location: {
      lat: 17.25,
      lon: -92.1167,
      address: "Parque Natural, Chiapas",
    },
    ecoFriendly: true,
    rating: 4.9,
    reviews: [],
    images: ["/cascadas-agua-azul-naturaleza.jpg"],
  },
  {
    id: "3",
    name: "Museo de Arte Popular",
    description:
      "Exhibición permanente de artesanías mexicanas y arte popular de todas las regiones del país. Talleres interactivos disponibles.",
    type: "cultural",
    location: {
      lat: 19.418,
      lon: -99.155,
      address: "Revillagigedo 11, Centro",
    },
    ecoFriendly: false,
    rating: 4.6,
    reviews: [],
    images: ["/museo-arte-popular-mexicano.jpg"],
  },
]

// Recommendation Algorithm (simplified)
export function getRecommendations(preferences: string[], language: string): Guide[] {
  return mockGuides
    .filter((guide) => {
      const hasMatchingLanguage = guide.languages.includes(language)
      const hasMatchingPreference = preferences.some((pref) =>
        guide.specialty.toLowerCase().includes(pref.toLowerCase()),
      )
      return hasMatchingLanguage || hasMatchingPreference
    })
    .sort((a, b) => b.rating - a.rating)
}
