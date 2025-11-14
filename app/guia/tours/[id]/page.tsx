"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Trash2, Image as ImageIcon } from "lucide-react"

import { Tour } from "../page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TourReservationsCalendar from "@/components/tour-reservations-calendar"
import TourReservationsList from "@/components/tour-reservations-list"

const STORAGE_KEY = "turiLink_tours"

const DEFAULT_IMAGES = [
  "/miradorzh.jpg",
  "/hardrock.jpeg",
  "/coco-bongo-cancun.jpg",
]

const INITIAL_DETAILS_FORM = {
  nombre: "",
  tipo: "",
  duracion: "",
  precio: "",
  maxPersonas: "",
  ubicacion: "",
  descripcion: "",
  incluye: "",
  paquete: "",
  pagados: "",
  pendientes: "",
  aceptadosSinPago: "",
  lugaresRelacionados: "",
  imagenes: "",
}

export default function TourDetailsPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id

  const [tours, setTours] = useState<Tour[] | null>(null)
  const [detailsForm, setDetailsForm] = useState(INITIAL_DETAILS_FORM)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [initialized, setInitialized] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Cargar tours desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Tour[]
        if (Array.isArray(parsed)) {
          setTours(parsed)
          return
        }
      }
      setTours([])
    } catch {
      setTours([])
    }
  }, [])

  const currentTour = useMemo(
    () => tours?.find((t) => t.id === id) ?? null,
    [tours, id],
  )

  // Inicializar formulario una vez que tengamos el tour
  useEffect(() => {
    if (!tours || !currentTour || initialized) return

    const imagesForTour =
      currentTour.images && currentTour.images.length > 0
        ? currentTour.images
        : DEFAULT_IMAGES

    setDetailsForm({
      nombre: currentTour.title,
      tipo: currentTour.type,
      duracion: currentTour.duration,
      precio: currentTour.price.toString(),
      maxPersonas: currentTour.maxGuests.toString(),
      ubicacion: currentTour.meetingPoint ?? "",
      descripcion: currentTour.description ?? "",
      incluye: currentTour.includes ?? "",
      paquete: currentTour.packageType ?? "Básico",
      pagados: (currentTour.paidBookings ?? 0).toString(),
      pendientes: (currentTour.pendingBookings ?? 0).toString(),
      aceptadosSinPago: (currentTour.acceptedUnpaidBookings ?? 0).toString(),
      lugaresRelacionados: (currentTour.relatedPlaces ?? []).join(", "),
      imagenes: imagesForTour.join(", "),
    })

    // Si el tour no tenía imágenes, las guardamos en el estado
    if (!currentTour.images || currentTour.images.length === 0) {
      setTours((prev) =>
        prev
          ? prev.map((t) =>
              t.id === currentTour.id ? { ...t, images: imagesForTour } : t,
            )
          : prev,
      )
    }

    setCurrentImageIndex(0)
    setInitialized(true)
  }, [tours, currentTour, initialized])

  // Guardar en localStorage cuando cambien los tours
  useEffect(() => {
    if (!tours || typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tours))
  }, [tours])

  const handleDetailsChange =
    (field: keyof typeof INITIAL_DETAILS_FORM) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDetailsForm((prev) => ({ ...prev, [field]: event.target.value }))
    }

  // Lista de URLs de imágenes (las del formulario)
  const imageUrls =
    detailsForm.imagenes
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? []

  const goPrevImage = () => {
    if (imageUrls.length === 0) return
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const goNextImage = () => {
    if (imageUrls.length === 0) return
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length)
  }

  // Botón para abrir el explorador de archivos
  const handlePickFiles = () => {
    fileInputRef.current?.click()
  }

  // Cuando selecciona imágenes desde el explorador
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string // data URL
        setDetailsForm((prev) => {
          const currentList =
            prev.imagenes
              ?.split(",")
              .map((s) => s.trim())
              .filter(Boolean) ?? []
          return {
            ...prev,
            imagenes: [...currentList, result].join(", "),
          }
        })
      }
      reader.readAsDataURL(file)
    })

    // limpiar input para poder volver a seleccionar el mismo archivo si quiere
    event.target.value = ""
  }

  // Eliminar una imagen concreta
  const handleDeleteImageAt = (index: number) => {
    const list = imageUrls
    if (index < 0 || index >= list.length) return
    const newList = list.filter((_, i) => i !== index)
    setDetailsForm((prev) => ({
      ...prev,
      imagenes: newList.join(", "),
    }))
    setCurrentImageIndex((prevIdx) => {
      if (newList.length === 0) return 0
      if (prevIdx >= newList.length) return newList.length - 1
      return prevIdx
    })
  }

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()
    if (!tours || !currentTour) return

    const relatedPlaces =
      detailsForm.lugaresRelacionados
        ?.split(",")
        .map((p) => p.trim())
        .filter(Boolean) ?? []

    const images =
      detailsForm.imagenes
        ?.split(",")
        .map((p) => p.trim())
        .filter(Boolean) ?? []

    const updatedTours = tours.map((tour) =>
      tour.id === currentTour.id
        ? {
            ...tour,
            title: detailsForm.nombre.trim() || tour.title,
            type: detailsForm.tipo || tour.type,
            price: Number(detailsForm.precio) || tour.price,
            duration: detailsForm.duracion || tour.duration,
            maxGuests: Number(detailsForm.maxPersonas) || tour.maxGuests,
            meetingPoint: detailsForm.ubicacion,
            description: detailsForm.descripcion,
            includes: detailsForm.incluye,
            packageType: detailsForm.paquete || tour.packageType,
            paidBookings: Number(detailsForm.pagados) || 0,
            pendingBookings: Number(detailsForm.pendientes) || 0,
            acceptedUnpaidBookings: Number(detailsForm.aceptadosSinPago) || 0,
            relatedPlaces,
            images,
          }
        : tour,
    )

    setTours(updatedTours)
    alert("Cambios guardados correctamente.")
  }

  const handleDeleteTour = () => {
    if (!tours || !currentTour) return
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar el tour "${currentTour.title}"? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return

    const filtered = tours.filter((t) => t.id !== currentTour.id)
    setTours(filtered)
    router.push("/guia/tours")
  }

  if (!tours) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Cargando información del tour...</p>
      </div>
    )
  }

  if (!currentTour) {
    return (
      <div className="p-6 space-y-4">
        <Button variant="ghost" onClick={() => router.push("/guia/tours")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Mis Tours
        </Button>
        <p className="text-destructive">No se encontró el tour solicitado.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Botón volver arriba del título */}
      <Button
        variant="ghost"
        onClick={() => router.push("/guia/tours")}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a Mis Tours
      </Button>

      {/* Título + botón eliminar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold leading-tight">{currentTour.title}</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona todos los detalles, pagos y contenido de este tour.
          </p>
        </div>

        <Button
          variant="outline"
          className="bg-destructive/10 border-destructive/40 text-destructive hover:bg-destructive/20"
          onClick={handleDeleteTour}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar tour
        </Button>
      </div>

      {/* Resumen rápido */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tipo</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="secondary">{currentTour.type}</Badge>
            <p className="mt-2 text-xs text-muted-foreground">
              Paquete: {currentTour.packageType ?? "Básico"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Precio</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl font-bold">${currentTour.price}</p>
            <p className="text-xs text-muted-foreground">MXN por persona</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Duración</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-base">{currentTour.duration}</p>
            <p className="text-xs text-muted-foreground">
              Máx. {currentTour.maxGuests} personas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reservas</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm">
            <p>Pagados: {currentTour.paidBookings ?? 0}</p>
            <p>Pendientes: {currentTour.pendingBookings ?? 0}</p>
            <p>Aceptados sin pagar: {currentTour.acceptedUnpaidBookings ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulario completo de gestión */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Imágenes del tour */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between gap-4">
            <CardTitle className="text-base">Imágenes del tour</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePickFiles}
              >
                Añadir imágenes
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Carrusel principal */}
            <div className="space-y-2">
              <div className="aspect-video w-full overflow-hidden rounded-md bg-muted flex items-center justify-center">
                {imageUrls.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrls[currentImageIndex]}
                    alt="Imagen del tour"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground text-sm gap-2">
                    <ImageIcon className="w-6 h-6" />
                    <span>Sin imágenes aún</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goPrevImage}
                  disabled={imageUrls.length === 0}
                >
                  Anterior
                </Button>
                <div className="flex gap-1">
                  {imageUrls.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`h-2 w-2 rounded-full ${
                        idx === currentImageIndex ? "bg-primary" : "bg-muted"
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goNextImage}
                  disabled={imageUrls.length === 0}
                >
                  Siguiente
                </Button>
              </div>
            </div>

            {/* Miniaturas para ver y eliminar */}
            {imageUrls.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs">
                  Miniaturas (haz clic en la papelera para eliminar)
                </Label>
                <div className="flex flex-wrap gap-3">
                  {imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-16 rounded-md overflow-hidden border bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                        onClick={() => handleDeleteImageAt(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      {/* Panel de reservas (FUERA del carrusel y del card de imágenes) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Panel de Reservas - Guía Turístico</h2>
          <p className="text-muted-foreground">
            Gestiona tus reservas activas, controla pagos y planifica tus tours por semana y mes
          </p>
        </div>

        <section>
          <TourReservationsCalendar tours={tours} />
        </section>

        <section>
          <TourReservationsList tours={tours} />
        </section>
      </div>
        {/* Información general */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Información general</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre del Tour</Label>
                <Input value={detailsForm.nombre} onChange={handleDetailsChange("nombre")} />
              </div>
              <div className="space-y-2">
                <Label>Tipo de Tour</Label>
                <Input value={detailsForm.tipo} onChange={handleDetailsChange("tipo")} />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Duración</Label>
                <Input value={detailsForm.duracion} onChange={handleDetailsChange("duracion")} />
              </div>
              <div className="space-y-2">
                <Label>Precio (MXN)</Label>
                <Input
                  type="number"
                  value={detailsForm.precio}
                  onChange={handleDetailsChange("precio")}
                />
              </div>
              <div className="space-y-2">
                <Label>Máx. Personas</Label>
                <Input
                  type="number"
                  value={detailsForm.maxPersonas}
                  onChange={handleDetailsChange("maxPersonas")}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Paquete</Label>
                <Input
                  placeholder="Básico, Clásico, Premium, VIP..."
                  value={detailsForm.paquete}
                  onChange={handleDetailsChange("paquete")}
                />
              </div>
              <div className="space-y-2">
                <Label>Punto de Encuentro</Label>
                <Input
                  value={detailsForm.ubicacion}
                  onChange={handleDetailsChange("ubicacion")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pagos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Estado de pagos</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Pagados</Label>
              <Input
                type="number"
                value={detailsForm.pagados}
                onChange={handleDetailsChange("pagados")}
              />
            </div>
            <div className="space-y-2">
              <Label>Pendientes de pago</Label>
              <Input
                type="number"
                value={detailsForm.pendientes}
                onChange={handleDetailsChange("pendientes")}
              />
            </div>
            <div className="space-y-2">
              <Label>Aceptados sin pagar</Label>
              <Input
                type="number"
                value={detailsForm.aceptadosSinPago}
                onChange={handleDetailsChange("aceptadosSinPago")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Descripción, incluye, lugares */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contenido del tour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                rows={4}
                value={detailsForm.descripcion}
                onChange={handleDetailsChange("descripcion")}
              />
            </div>

            <div className="space-y-2">
              <Label>¿Qué incluye?</Label>
              <Textarea
                rows={3}
                value={detailsForm.incluye}
                onChange={handleDetailsChange("incluye")}
              />
            </div>

            <div className="space-y-2">
              <Label>Lugares relacionados (separados por coma)</Label>
              <Input
                placeholder="Catedral, Centro Histórico, Museo X..."
                value={detailsForm.lugaresRelacionados}
                onChange={handleDetailsChange("lugaresRelacionados")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/guia/tours")}
          >
            Cancelar
          </Button>
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>


    </div>
  )
}
