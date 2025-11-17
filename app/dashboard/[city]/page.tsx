'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AQIDisplay } from '@/components/aqi-display'
import { WeatherIntegration } from '@/components/weather-integration'
import { PollutantBreakdown } from '@/components/pollutant-breakdown'
import { HealthAdvisory } from '@/components/health-advisory'
import { DataVisualization } from '@/components/data-visualization'
import { HeaderNav } from '@/components/header-nav'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

// ... existing city data ...

const cityData = {
  samarinda: {
    displayName: 'Samarinda',
    aqi: 78,
    trend: 'up' as const,
    trendValue: 5,
    temp: 28,
    humidity: 78,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    condition: 'cloudy',
    pollutants: [
      { name: 'PM2.5', current: 45, whoLimit: 35, status: 'warning' as const },
      { name: 'PM10', current: 58, whoLimit: 50, status: 'warning' as const },
      { name: 'O3', current: 65, whoLimit: 100, status: 'safe' as const },
      { name: 'NO2', current: 32, whoLimit: 40, status: 'safe' as const },
    ],
  },
  bontang: {
    displayName: 'Bontang',
    aqi: 45,
    trend: 'down' as const,
    trendValue: 3,
    temp: 27,
    humidity: 75,
    windSpeed: 15,
    visibility: 12,
    pressure: 1012,
    condition: 'sunny',
    pollutants: [
      { name: 'PM2.5', current: 18, whoLimit: 35, status: 'safe' as const },
      { name: 'PM10', current: 25, whoLimit: 50, status: 'safe' as const },
      { name: 'O3', current: 42, whoLimit: 100, status: 'safe' as const },
      { name: 'NO2', current: 15, whoLimit: 40, status: 'safe' as const },
    ],
  },
  balikpapan: {
    displayName: 'Balikpapan',
    aqi: 165,
    trend: 'up' as const,
    trendValue: 8,
    temp: 29,
    humidity: 82,
    windSpeed: 8,
    visibility: 4,
    pressure: 1014,
    condition: 'cloudy',
    pollutants: [
      { name: 'PM2.5', current: 95, whoLimit: 35, status: 'danger' as const },
      { name: 'PM10', current: 128, whoLimit: 50, status: 'danger' as const },
      { name: 'O3', current: 120, whoLimit: 100, status: 'warning' as const },
      { name: 'NO2', current: 58, whoLimit: 40, status: 'danger' as const },
    ],
  },
}

const allCitiesData = [
  { name: 'Samarinda', aqi: 78, temp: 28, humidity: 78, status: 'moderate' as const },
  { name: 'Bontang', aqi: 45, temp: 27, humidity: 75, status: 'good' as const },
  { name: 'Balikpapan', aqi: 165, temp: 29, humidity: 82, status: 'unhealthy' as const },
]

export default function DashboardPage() {
  const params = useParams()
  const router = useRouter()
  const cityParam = (params.city as string).toLowerCase()
  const data = cityData[cityParam as keyof typeof cityData] || cityData.samarinda
  const cityName = data.displayName
  const [showCitySwitcher, setShowCitySwitcher] = useState(false)

  const handleViewDetails = (city: string) => {
    router.push(`/dashboard/${city.toLowerCase()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <HeaderNav />
      
      <div className="pt-20 p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dasbor Kualitas Udara {cityName}</h1>
          <p className="text-muted-foreground">Pemantauan real-time dan rekomendasi kesehatan</p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AQIDisplay city={cityName} aqi={data.aqi} trend={data.trend} trendValue={data.trendValue} />
          <div className="md:col-span-2">
            <WeatherIntegration
              city={cityName}
              temp={data.temp}
              humidity={data.humidity}
              windSpeed={data.windSpeed}
              visibility={data.visibility}
              pressure={data.pressure}
              condition={data.condition}
            />
          </div>
        </div>

        <div>
          <PollutantBreakdown pollutants={data.pollutants} />
        </div>

        <div>
          <DataVisualization selectedCity={cityName} />
        </div>

        <div>
          <HealthAdvisory aqi={data.aqi} city={cityName} />
        </div>
      </div>

      <Button
        size="icon"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        onClick={() => setShowCitySwitcher(!showCitySwitcher)}
      >
        <MapPin className="w-6 h-6" />
      </Button>

      {/* City Switcher Modal */}
      {showCitySwitcher && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-6" onClick={() => setShowCitySwitcher(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Ganti Kota</h3>
            <div className="space-y-2">
              {allCitiesData.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    handleViewDetails(city.name)
                    setShowCitySwitcher(false)
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    city.name === cityName
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{city.name}</p>
                      <p className="text-sm text-muted-foreground">AQI: {city.aqi}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      city.aqi <= 50 ? 'bg-green-100 text-green-700' :
                      city.aqi <= 100 ? 'bg-yellow-100 text-yellow-700' :
                      city.aqi <= 150 ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {city.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
