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
