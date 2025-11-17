'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Heart, Users, Baby, AlertCircle, Dumbbell, Clock, Cast as Mask } from 'lucide-react'

interface HealthAdvisoryProps {
  aqi: number
  city: string
}

export function HealthAdvisory({ aqi, city }: HealthAdvisoryProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'sensitive' | 'elderly'>('general')

  useEffect(() => {
    const savedTab = localStorage.getItem('healthAdvisoryTab')
    if (savedTab && (savedTab === 'general' || savedTab === 'sensitive' || savedTab === 'elderly')) {
      setActiveTab(savedTab)
    }
  }, [])

  const handleTabChange = (tab: 'general' | 'sensitive' | 'elderly') => {
    setActiveTab(tab)
    localStorage.setItem('healthAdvisoryTab', tab)
  }

  const getAdvice = (group: 'general' | 'sensitive' | 'elderly') => {
    const adviceMap = {
      general: {
        icon: Users,
        recommendations: [
          { icon: Dumbbell, title: 'Exercise', content: aqi > 150 ? 'Limit outdoor exercise' : 'Safe for outdoor activities' },
          { icon: Mask, title: 'Mask Protection', content: aqi > 100 ? 'Wear N95 mask outdoors' : 'No mask required' },
          { icon: Clock, title: 'Best Time', content: aqi > 100 ? '7 PM - 8 AM (lowest AQI)' : 'Anytime is suitable' },
          { icon: AlertCircle, title: 'Caution', content: aqi > 200 ? 'Avoid outdoor activities' : 'Normal precautions' },
        ],
        description: 'General population recommendations for current air quality conditions.',
      },
      sensitive: {
        icon: Heart,
        recommendations: [
          { icon: Dumbbell, title: 'Exercise', content: aqi > 100 ? 'Avoid outdoor exercise' : 'Light outdoor activity acceptable' },
          { icon: Mask, title: 'Mask Protection', content: aqi > 75 ? 'Always wear N95+ mask' : 'Recommended outdoors' },
          { icon: Clock, title: 'Best Time', content: aqi > 75 ? 'Stay indoors, use air purifier' : 'Morning 6-8 AM preferred' },
          { icon: AlertCircle, title: 'Health Alert', content: aqi > 150 ? 'Have rescue inhaler ready' : 'Monitor symptoms' },
        ],
        description: 'For people with respiratory or heart conditions, children, and elderly.',
      },
      elderly: {
        icon: Baby,
        recommendations: [
          { icon: Dumbbell, title: 'Activity Level', content: aqi > 100 ? 'Minimal outdoor activity' : 'Light activities permitted' },
          { icon: Mask, title: 'Mask Protection', content: aqi > 50 ? 'Always wear N95+ mask' : 'Recommended' },
          { icon: Clock, title: 'Indoor Time', content: aqi > 150 ? 'Stay indoors as much as possible' : 'Limit to 1-2 hours outdoors' },
          { icon: AlertCircle, title: 'Medical Care', content: 'Monitor vitals regularly, contact doctor if symptoms occur' },
        ],
        description: 'Special care recommendations for elderly individuals.',
      },
    }
    return adviceMap[group]
  }

  const currentAdvice = getAdvice(activeTab)
  const CurrentIcon = currentAdvice.icon

  const getAqiStatus = () => {
    if (aqi <= 50) return { text: 'Baik - Aman untuk semua aktivitas', color: 'text-emerald-700 dark:text-emerald-300' }
    if (aqi <= 100) return { text: 'Sedang - Kelompok sensitif sebaiknya membatasi aktivitas', color: 'text-amber-700 dark:text-amber-300' }
    if (aqi <= 150) return { text: 'Tidak Sehat untuk Kelompok Sensitif - Hindari aktivitas luar ruangan yang lama', color: 'text-orange-700 dark:text-orange-300' }
    if (aqi <= 200) return { text: 'Tidak Sehat - Semua orang sebaiknya membatasi aktivitas luar ruangan', color: 'text-red-700 dark:text-red-300' }
    return { text: 'Berbahaya - Tetap di dalam ruangan', color: 'text-purple-700 dark:text-purple-300' }
  }

  const status = getAqiStatus()

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Saran Kesehatan - {city}</h3>
          <p className={`text-sm font-medium ${status.color}`}>{status.text}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-border">
          {(['general', 'sensitive', 'elderly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-[2px] ${
                activeTab === tab
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'general' && 'Umum'}
              {tab === 'sensitive' && 'Kelompok Sensitif'}
              {tab === 'elderly' && 'Lansia'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <CurrentIcon className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">{currentAdvice.description}</p>
          </div>

          <div className="space-y-3">
            {currentAdvice.recommendations.map((rec, idx) => {
              const RecIcon = rec.icon
              return (
                <div key={idx} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-border">
                  <RecIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{rec.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{rec.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
