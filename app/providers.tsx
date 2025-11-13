"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { mockLocals } from "@/lib/mock-data"
import type { Local } from "@/lib/mock-data"

interface LocalsContextType {
  locals: Local[]
  addLocal: (local: Omit<Local, "id" | "rating" | "reviews">) => void
}

const LocalsContext = createContext<LocalsContextType | undefined>(undefined)

export function LocalsProvider({ children }: { children: React.ReactNode }) {
  const [locals, setLocals] = useState<Local[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const storedLocals = localStorage.getItem("turilink_locals")
    if (storedLocals) {
      try {
        setLocals(JSON.parse(storedLocals))
      } catch {
        setLocals(mockLocals)
      }
    } else {
      setLocals(mockLocals)
    }
    setIsHydrated(true)
  }, [])

  const addLocal = useCallback(
    (newLocal: Omit<Local, "id" | "rating" | "reviews">) => {
      const local: Local = {
        ...newLocal,
        id: String(Date.now()),
        rating: 5.0,
        reviews: [],
      }
      const updatedLocals = [...locals, local]
      setLocals(updatedLocals)
      localStorage.setItem("turilink_locals", JSON.stringify(updatedLocals))
    },
    [locals],
  )

  if (!isHydrated) {
    return <>{children}</>
  }

  return <LocalsContext.Provider value={{ locals, addLocal }}>{children}</LocalsContext.Provider>
}

export function useLocals() {
  const context = useContext(LocalsContext)
  if (!context) {
    throw new Error("useLocals must be used within LocalsProvider")
  }
  return context
}
