export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface Local {
  id: string
  name: string
  category: string
  address: string
  description: string
  icon?: string
  likes: number
  rating: number
  reviews: Review[]
  image?: string
  guideId: string
}

export const mockLocals: Local[] = [
  {
    id: "1",
    name: "Café de Tacuba",
    category: "Restaurante",
    address: "Tacuba 28, Centro Histórico",
    description: "Comida tradicional mexicana en un ambiente histórico",
    icon: "Utensils",
    likes: 45,
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        author: "María López",
        rating: 5,
        comment: "Excelente comida tradicional y ambiente único",
        date: "2024-01-15",
      },
    ],
    image: "/traditional-mexican-restaurant.jpg",
    guideId: "1", // Updated to match guide ID
  },
  {
    id: "2",
    name: "Museo Frida Kahlo",
    category: "Museo",
    address: "Londres 247, Del Carmen",
    description: "La Casa Azul, hogar de Frida Kahlo",
    icon: "Home",
    likes: 89,
    rating: 4.9,
    reviews: [
      {
        id: "r2",
        author: "Carlos Ramírez",
        rating: 5,
        comment: "Una experiencia cultural inolvidable",
        date: "2024-01-20",
      },
    ],
    image: "/frida-kahlo-museum-blue-house.jpg",
    guideId: "1",
  },
  {
    id: "3",
    name: "Mercado de San Juan",
    category: "Mercado",
    address: "Ernesto Pugibet 21, Centro",
    description: "Ingredientes exóticos y comida gourmet",
    icon: "ShoppingBag",
    likes: 67,
    rating: 4.6,
    reviews: [],
    image: "/mexican-market-fresh-produce.jpg",
    guideId: "2",
  },
  {
    id: "4",
    name: "Café Avellaneda",
    category: "Cafetería",
    address: "Álvaro Obregón 88, Roma Norte",
    description: "Café de especialidad y ambiente acogedor",
    icon: "Coffee",
    likes: 34,
    rating: 4.7,
    reviews: [
      {
        id: "r3",
        author: "Ana Torres",
        rating: 5,
        comment: "El mejor café de la ciudad",
        date: "2024-02-01",
      },
    ],
    image: "/cozy-coffee-shop-interior.jpg",
    guideId: "2",
  },
  {
    id: "5",
    name: "El Oasis Mariscos",
    category: "Restaurante",
    address: "Av. Bonampak, Cancún",
    description: "Mariscos frescos en un ambiente relajado",
    icon: "Utensils",
    likes: 78,
    rating: 4.8,
    reviews: [
      {
        id: "r4",
        author: "Pedro Sánchez",
        rating: 5,
        comment: "Los mejores mariscos de Cancún",
        date: "2024-02-05",
      },
    ],
    image: "/El-Oasis-Mariscos-Cancun.jpg",
    guideId: "3",
  },
  {
    id: "6",
    name: "El Huerto Del Eden",
    category: "Restaurante",
    address: "Playa del Carmen",
    description: "Restaurante con ambiente natural y cocina fresca",
    icon: "Utensils",
    likes: 92,
    rating: 4.9,
    reviews: [],
    image: "/El-Huerto-Del-Eden.jpg",
    guideId: "3",
  },
  {
    id: "7",
    name: "Fred's Restaurant",
    category: "Restaurante",
    address: "Playa del Carmen",
    description: "Cocina internacional en un ambiente elegante",
    icon: "Utensils",
    likes: 65,
    rating: 4.7,
    reviews: [
      {
        id: "r5",
        author: "Laura Martínez",
        rating: 5,
        comment: "Excelente servicio y comida deliciosa",
        date: "2024-02-10",
      },
    ],
    image: "/Freds-Restaurant.jpg",
    guideId: "4",
  },
  {
    id: "8",
    name: "Restaurante Cetli",
    category: "Restaurante",
    address: "Av. Cobá, Tulum",
    description: "Cocina mexicana contemporánea con ingredientes locales y vista a la selva",
    icon: "Utensils",
    likes: 127,
    rating: 4.9,
    reviews: [
      {
        id: "r6",
        author: "Roberto Díaz",
        rating: 5,
        comment: "Una experiencia culinaria excepcional en Tulum",
        date: "2024-02-15",
      },
    ],
    image: "/chef-guia-gastronomico.jpg",
    guideId: "1",
  },
]
