import Link from "next/link"
import { MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TuriLink</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Conectando turistas con guías locales auténticos para experiencias inolvidables.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-4 h-4 text-primary" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Twitter className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Para Turistas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/explorar" className="hover:text-primary">
                  Explorar Tours
                </Link>
              </li>
              <li>
                <Link href="/guias" className="hover:text-primary">
                  Encontrar Guías
                </Link>
              </li>
              <li>
                <Link href="/experiencias" className="hover:text-primary">
                  Experiencias
                </Link>
              </li>
              <li>
                <Link href="/ia-planner" className="hover:text-primary">
                  IA Planner
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Para Guías</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/guia/registro" className="hover:text-primary">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link href="/guia/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/guia/recursos" className="hover:text-primary">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/guia/comisiones" className="hover:text-primary">
                  Comisiones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/ayuda" className="hover:text-primary">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-primary">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-primary">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-primary">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 TuriLink. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
