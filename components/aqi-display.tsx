'use client'

import { ArrowUp, ArrowDown, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface AQIDisplayProps {
  city: string
  aqi: number
  trend: 'up' | 'down' | 'stable'
  trendValue: number
}

export function AQIDisplay({ city, aqi, trend, trendValue }: AQIDisplayProps) {
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return { bg: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', label: 'Baik' }
    if (aqi <= 100) return { bg: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', label: 'Sedang' }
    if (aqi <= 150) return { bg: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-300', label: 'Tidak Sehat untuk Kelompok Sensitif' }
    if (aqi <= 200) return { bg: 'bg-red-500', text: 'text-red-700 dark:text-red-300', label: 'Tidak Sehat' }
    if (aqi <= 300) return { bg: 'bg-purple-600', text: 'text-purple-700 dark:text-purple-300', label: 'Sangat Tidak Sehat' }
    return { bg: 'bg-red-800', text: 'text-red-700 dark:text-red-300', label: 'Berbahaya' }
  }

  const colorInfo = getAqiColor(aqi)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (aqi / 500) * circumference

  return (
    <Card className="p-8 bg-white dark:bg-slate-800 border-0 shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground text-center">Indeks Kualitas Udara {city}</p>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={`transition-all duration-1000 ${colorInfo.bg.replace('bg-', 'text-').replace('-500', '-600').replace('-600', '-600').replace('-800', '-800')}`}
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`text-4xl font-bold ${colorInfo.text}`}>{aqi}</p>
            <p className="text-xs text-muted-foreground">AQI</p>
          </div>
        </div>

        {/* Status and Trend */}
        <div className="text-center space-y-3 w-full">
          <div>
            <p className={`text-lg font-semibold ${colorInfo.text}`}>{colorInfo.label}</p>
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center justify-center gap-2">
            {trend === 'up' && (
              <>
                <ArrowUp className="w-4 h-4 text-red-500" />
                <span className="text-xs text-muted-foreground">
                  Memburuk <span className="text-red-500 font-medium">({trendValue}%)</span>
                </span>
              </>
            )}
            {trend === 'down' && (
              <>
                <ArrowDown className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-muted-foreground">
                  Membaik <span className="text-emerald-500 font-medium">({trendValue}%)</span>
                </span>
              </>
            )}
            {trend === 'stable' && (
              <>
                <div className="w-4 h-4 text-gray-500">—</div>
                <span className="text-xs text-muted-foreground">
                  Stabil ({trendValue}%)
                </span>
              </>
            )}
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground pt-2 border-t border-border">
            <Clock className="w-3 h-3" />
            <span>Terakhir diperbarui: 5 menit lalu</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
