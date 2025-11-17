"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { getCityRankings } from "@/lib/city-data";
import { HeaderNav } from "@/components/header-nav";
import { Footer } from "@/components/footer";
import { CityComparisonTable } from "@/components/city-comparison-table";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    L: any;
  }
}

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cityRankings = getCityRankings();

  // Map state
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const allCities = cityRankings.filter((city) => city.lat && city.lng);

  const eastKalimantanCities = cityRankings
    .filter((city) =>
      ["Samarinda", "Bontang", "Balikpapan"].includes(city.name)
    )
    .map((city) => ({
      name: city.name,
      aqi: city.aqi,
      temp: city.temp || 28,
      humidity: city.humidity || 75,
      status: city.status as
        | "good"
        | "moderate"
        | "unhealthy"
        | "unhealthy-sensitive"
        | "very-unhealthy"
        | "hazardous",
    }));

  const filteredCities = cityRankings
    .filter(
      (city) =>
        ["Samarinda", "Bontang", "Balikpapan"].includes(city.name) &&
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const handleViewDetails = (city: string) => {
    router.push(`/dashboard/${city.toLowerCase()}`);
  };

  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return "#10b981";
    if (aqi <= 100) return "#eab308";
    if (aqi <= 150) return "#f97316";
    if (aqi <= 200) return "#ef4444";
    if (aqi <= 300) return "#a855f7";
    return "#7f1d1d";
  };

  // Load Leaflet
  useEffect(() => {
    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }

      if (!window.L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.integrity =
            "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
          script.crossOrigin = "";
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }

      setMapLoaded(true);
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapInstanceRef.current) return;

    const L = window.L;
    const map = L.map(mapRef.current).setView([-0.5, 117.1], 9);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLoaded]);

  // Add markers for East Kalimantan cities only
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    const L = window.L;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    allCities
      .filter((city) =>
        ["Samarinda", "Bontang", "Balikpapan"].includes(city.name)
      )
      .forEach((city) => {
        if (city.lat && city.lng) {
          const marker = L.circleMarker([city.lat, city.lng], {
            radius: 8,
            fillColor: getMarkerColor(city.aqi),
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(mapInstanceRef.current);

          marker.bindPopup(`
          <div style="text-align: center; min-width: 150px;">
            <strong style="font-size: 14px;">${city.name}</strong><br/>
            <span style="font-size: 12px; color: #666;">${
              city.country
            }</span><br/>
            <div style="margin: 8px 0;">
              <span style="font-size: 24px; font-weight: bold;">${
                city.aqi
              }</span><br/>
              <span style="font-size: 11px; text-transform: uppercase;">${city.status.replace(
                "-",
                " "
              )}</span>
            </div>
            <span style="font-size: 11px; color: #666;">Main: ${
              city.mainPollutant
            }</span>
          </div>
        `);

          markersRef.current.push(marker);
        }
      });
  }, [mapLoaded, allCities]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-foreground overflow-hidden">
      <HeaderNav />

      <section className="pt-20 px-6 bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
            {/* Kolom Kiri: Konten Teks */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
                  Cek Kualitas Udara Lokal Anda
                </h1>
                <p className="text-lg md:text-xl mb-8 text-muted-foreground">
                  Dapatkan data AQI real-time, prakiraan, dan rekomendasi
                  kesehatan untuk kehidupan yang lebih sehat.
                </p>
              </div>

              <div className="relative mb-6">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cari kota atau lokasi..."
                    className="w-full h-16 pl-16 pr-6 text-xl rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary transition-all"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                  />
                </div>

                {showSuggestions && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-lg overflow-hidden z-10">
                    {filteredCities.map((city) => (
                      <Link
                        key={city.rank}
                        href={`/dashboard/${city.name?.toLowerCase() || ""}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">
                              {city.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {city.country}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            city.aqi <= 50
                              ? "bg-green-100 text-green-700"
                              : city.aqi <= 100
                              ? "bg-yellow-100 text-yellow-700"
                              : city.aqi <= 150
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {city.aqi}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-muted-foreground text-sm">
                Populer:{" "}
                <Link
                  href="/dashboard/samarinda"
                  className="font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Samarinda
                </Link>
                {", "}
                <Link
                  href="/dashboard/bontang"
                  className="font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Bontang
                </Link>
                {", "}
                <Link
                  href="/dashboard/balikpapan"
                  className="font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Balikpapan
                </Link>
              </div>
            </div>

            {/* Kolom Kanan: 2 Gambar */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              {/* Gambar Atas - Selalu tampil */}
              <div className="relative h-[60%] rounded-t-2xl lg:rounded-tr-2xl lg:rounded-tl-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900 dark:to-teal-900 z-10">
                <Image
                  src="/city.svg"
                  alt="Orang dengan masker di tempat umum"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Gambar Bawah - Hanya tampil di desktop */}
              <div className="hidden lg:block absolute bottom-0 right-0 w-[70%] h-[50%] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900 z-20 transform translate-x-2">
                <Image
                  src="/scooter.svg"
                  alt="Wanita dengan masker memberikan thumbs up"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Fokus Regional: Kalimantan Timur
          </h2>
          <CityComparisonTable
            cities={eastKalimantanCities}
            onViewDetails={handleViewDetails}
          />
        </div>
      </section>

      <section className="relative py-20 px-6 pt-32 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Kolom Kiri: Peta */}
            <div className="lg:col-span-3 relative z-10">
              <div
                ref={mapRef}
                className="h-[500px] rounded-xl shadow-lg relative z-10"
                style={{ zIndex: 10 }}
              />
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-xl z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Memuat peta...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Kolom Kanan: Judul & Deskripsi */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance md:ml-2">
                Ketahui Udara di Kalimantan Timur.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed md:ml-2">
                Data kualitas udara real-time untuk Samarinda, Bontang, dan
                Balikpapan. Temukan wawasan polusi terperinci di kota Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Polusi Bukan Sekadar Angka.
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Partikel PM2.5 dapat memengaruhi kesehatan Anda secara serius.
                Polusi udara adalah ancaman nyata yang mempengaruhi jutaan orang
                setiap hari. Dengan memahami kualitas udara di sekitar Anda,
                Anda dapat mengambil langkah-langkah untuk melindungi kesehatan
                Anda dan keluarga.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <Image
                src="/angka.svg"
                alt="Jakarta dengan polusi udara"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-xl dark:bg-slate-800 flex items-center justify-center">
              <Image
                src="/undraw_urban-design_tz8n.svg"
                alt="Bandung dengan udara bersih"
                fill
                className="object-contain p-4"
              />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Data untuk Masa Depan Bersih.
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                AeroSense menyediakan data terbuka dan akurat untuk membantu
                Anda membuat keputusan yang tepat. Dengan teknologi pemantauan
                real-time, kami memberdayakan komunitas untuk mengambil tindakan
                terhadap polusi udara dan menciptakan lingkungan yang lebih
                sehat untuk generasi mendatang.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
