'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { getCityRankings } from '@/lib/city-data'
import { HeaderNav } from '@/components/header-nav'
import { Footer } from '@/components/footer'
import { CityComparisonTable } from '@/components/city-comparison-table'
import { CTASection } from '@/components/cta-section'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    L: any
  }
}

export default function LandingPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const cityRankings = getCityRankings()
  
  // Map state
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  const allCities = cityRankings.filter(city => city.lat && city.lng)
  
  const eastKalimantanCities = cityRankings
    .filter(city => ['Samarinda', 'Bontang', 'Balikpapan'].includes(city.name))
    .map(city => ({
      name: city.name,
      aqi: city.aqi,
      temp: city.temp || 28,
      humidity: city.humidity || 75,
      status: city.status as 'good' | 'moderate' | 'unhealthy' | 'unhealthy-sensitive' | 'very-unhealthy' | 'hazardous'
    }))

  const filteredCities = cityRankings.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5)

  const handleViewDetails = (city: string) => {
    router.push(`/dashboard/${city.toLowerCase()}`)
  }

  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return '#10b981'
    if (aqi <= 100) return '#eab308'
    if (aqi <= 150) return '#f97316'
    if (aqi <= 200) return '#ef4444'
    if (aqi <= 300) return '#a855f7'
    return '#7f1d1d'
  }

  // Load Leaflet
  useEffect(() => {
    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
        link.crossOrigin = ''
        document.head.appendChild(link)
      }

      if (!window.L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
          script.crossOrigin = ''
          script.onload = () => resolve()
          document.body.appendChild(script)
        })
      }

      setMapLoaded(true)
    }

    loadLeaflet()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapInstanceRef.current) return

    const L = window.L
    const map = L.map(mapRef.current).setView([20, 0], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [mapLoaded])

  // Add markers for all cities
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return

    const L = window.L

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    allCities.forEach(city => {
      if (city.lat && city.lng) {
        const marker = L.circleMarker([city.lat, city.lng], {
          radius: 8,
          fillColor: getMarkerColor(city.aqi),
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(mapInstanceRef.current)

        marker.bindPopup(`
          <div style="text-align: center; min-width: 150px;">
            <strong style="font-size: 14px;">${city.name}</strong><br/>
            <span style="font-size: 12px; color: #666;">${city.country}</span><br/>
            <div style="margin: 8px 0;">
              <span style="font-size: 24px; font-weight: bold;">${city.aqi}</span><br/>
              <span style="font-size: 11px; text-transform: uppercase;">${city.status.replace('-', ' ')}</span>
            </div>
            <span style="font-size: 11px; color: #666;">Main: ${city.mainPollutant}</span>
          </div>
        `)

        markersRef.current.push(marker)
      }
    })
  }, [mapLoaded, allCities])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-foreground overflow-hidden">
      <HeaderNav />

      {/* Section 1: Hero Peta Interaktif */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Kolom Kiri: Peta */}
            <div className="lg:col-span-3">
              <div ref={mapRef} className="h-[500px] rounded-xl shadow-lg" />
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-xl">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Memuat peta...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Kolom Kanan: Judul & Pencarian */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
                Ketahui Udara yang Anda Hirup.
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Data kualitas udara real-time dari 50+ kota di seluruh dunia. Dapatkan wawasan lengkap tentang polusi udara di sekitar Anda.
              </p>

              <div className="relative mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cari kota atau lokasi..."
                    className="w-full h-14 pl-12 pr-4 text-lg rounded-xl border-2 border-border focus:border-teal-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setShowSuggestions(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>
                
                {showSuggestions && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-lg overflow-hidden z-10">
                    {filteredCities.map((city) => (
                      <Link
                        key={city.rank}
                        href={`/dashboard/${city.name.toLowerCase()}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{city.name}</p>
                            <p className="text-sm text-muted-foreground">{city.country}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          city.aqi <= 50 ? 'bg-green-100 text-green-700' :
                          city.aqi <= 100 ? 'bg-yellow-100 text-yellow-700' :
                          city.aqi <= 150 ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {city.aqi}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sorotan Regional */}
      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Fokus Regional: Kalimantan Timur</h2>
          <CityComparisonTable cities={eastKalimantanCities} onViewDetails={handleViewDetails} />
        </div>
      </section>

      {/* Section 3: Visual "Masalah" */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/jakarta-cityscape-with-smog-and-pollution.jpg"
                alt="Jakarta dengan polusi udara"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Polusi Bukan Sekadar Angka.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Partikel PM2.5 dapat memengaruhi kesehatan Anda secara serius. Polusi udara adalah ancaman nyata yang mempengaruhi jutaan orang setiap hari. Dengan memahami kualitas udara di sekitar Anda, Anda dapat mengambil langkah-langkah untuk melindungi kesehatan Anda dan keluarga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Visual "Solusi" */}
      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Data untuk Masa Depan Bersih.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AeroSense menyediakan data terbuka dan akurat untuk membantu Anda membuat keputusan yang tepat. Dengan teknologi pemantauan real-time, kami memberdayakan komunitas untuk mengambil tindakan terhadap polusi udara dan menciptakan lingkungan yang lebih sehat untuk generasi mendatang.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/bandung-green-city-with-clear-blue-sky.jpg"
                alt="Bandung dengan udara bersih"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <CTASection />

      {/* Section 6: Footer */}
      <Footer />
    </div>
  )
}
