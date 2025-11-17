'use client'

import { useState } from 'react'
import { Wind, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">AeroSense</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/about" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                isActive('/about') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              Tentang Kami
            </Link>
            <Link 
              href="/news" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                isActive('/news') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              Ruang Berita
            </Link>
            <Link 
              href="/contribute" 
              className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                isActive('/contribute') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              Aksi & Kontribusi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              href="/about"
              className={`block py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link
              href="/news"
              className={`block py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                isActive('/news')
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Ruang Berita
            </Link>
            <Link
              href="/contribute"
              className={`block py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                isActive('/contribute')
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Aksi & Kontribusi
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
