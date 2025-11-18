import { Wind, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
                {/* <Wind className="w-6 h-6 text-white" /> */}
                <Image
                  src="/logo-2.png"
                  alt="AeroSense Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-emerald-500">Aero</span>
                <span className="text-white dark:text-slate-300">Sense</span>
              </span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Menyediakan data kualitas udara real-time untuk masa depan yang
              lebih sehat dan bersih.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/world-map"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Peta Kualitas Udara
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Ruang Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Aksi & Kontribusi
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">Sumber Daya</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Dokumentasi API
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Panduan Pengguna
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <Mail className="w-4 h-4" />
                <span>info@aerosense.id</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Phone className="w-4 h-4" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-start gap-2 opacity-90">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Samarinda, Kalimantan Timur, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm opacity-90">
          <p>
            &copy; {new Date().getFullYear()} AeroSense. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
