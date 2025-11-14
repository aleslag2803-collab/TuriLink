"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserType = "turista" | "guia" | "admin" | null

interface User {
  id: string
  email: string
  nombre: string
  tipo: "turista" | "guia" | "admin"
  avatar?: string
  telefono?: string
  pais?: string
  ciudad?: string
  idiomas?: string[]
  calificacion?: number
  descripcion?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, tipo: UserType) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
}

interface SignupData {
  email: string
  password: string
  nombre: string
  tipo: "turista" | "guia" | "admin"
  telefono?: string
  pais?: string
  ciudad?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar
    const storedUser = localStorage.getItem("turilink_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string, tipo: UserType) => {
    // Mock login - en producción conectar con backend
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      nombre: email.split("@")[0],
      tipo: tipo as "turista" | "guia" | "admin",
      avatar: "/placeholder-user.jpg",
      calificacion: tipo === "guia" ? 4.8 : undefined,
    }

    setUser(mockUser)
    localStorage.setItem("turilink_user", JSON.stringify(mockUser))
  }

  const signup = async (data: SignupData) => {
    // Mock signup - en producción conectar con backend
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email: data.email,
      nombre: data.nombre,
      tipo: data.tipo,
      telefono: data.telefono,
      pais: data.pais,
      ciudad: data.ciudad,
      avatar: "/placeholder-user.jpg",
      calificacion: data.tipo === "guia" ? 5.0 : undefined,
    }

    setUser(newUser)
    localStorage.setItem("turilink_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("turilink_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
