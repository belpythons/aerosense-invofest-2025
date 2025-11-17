"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Users,
  Baby,
  AlertCircle,
  Dumbbell,
  Clock,
  Cast as Mask,
} from "lucide-react";

interface HealthAdvisoryProps {
  aqi: number;
  city: string;
}

export function HealthAdvisory({ aqi, city }: HealthAdvisoryProps) {
  const [activeTab, setActiveTab] = useState<
    "general" | "sensitive" | "elderly"
  >("general");

  useEffect(() => {
    const savedTab = localStorage.getItem("healthAdvisoryTab");
    if (
      savedTab &&
      (savedTab === "general" ||
        savedTab === "sensitive" ||
        savedTab === "elderly")
    ) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (tab: "general" | "sensitive" | "elderly") => {
    setActiveTab(tab);
    localStorage.setItem("healthAdvisoryTab", tab);
  };

  const getAdvice = (group: "general" | "sensitive" | "elderly") => {
    const adviceMap = {
      general: {
        icon: Users,
        recommendations: [
          {
            icon: Dumbbell,
            title: "Olahraga",
            content:
              aqi > 150
                ? "Batasi olahraga di luar ruangan"
                : "Aman untuk aktivitas luar ruangan",
          },
          {
            icon: Mask,
            title: "Pelindung Masker",
            content:
              aqi > 100
                ? "Gunakan masker N95 saat di luar ruangan"
                : "Tidak perlu masker",
          },
          {
            icon: Clock,
            title: "Waktu Terbaik",
            content:
              aqi > 100
                ? "Pukul 19.00 - 08.00 (AQI terendah)"
                : "Kapan saja cocok",
          },
          {
            icon: AlertCircle,
            title: "Peringatan",
            content:
              aqi > 200
                ? "Hindari aktivitas luar ruangan"
                : "Tindakan pencegahan normal",
          },
        ],
        description:
          "Rekomendasi untuk populasi umum berdasarkan kondisi kualitas udara saat ini.",
      },
      sensitive: {
        icon: Heart,
        recommendations: [
          {
            icon: Dumbbell,
            title: "Olahraga",
            content:
              aqi > 100
                ? "Hindari olahraga di luar ruangan"
                : "Aktivitas ringan di luar masih dapat diterima",
          },
          {
            icon: Mask,
            title: "Pelindung Masker",
            content:
              aqi > 75
                ? "Selalu gunakan masker N95+ saat keluar"
                : "Direkomendasikan saat di luar ruangan",
          },
          {
            icon: Clock,
            title: "Waktu Terbaik",
            content:
              aqi > 75
                ? "Tetap di dalam ruangan, gunakan pembersih udara"
                : "Pagi hari 06.00-08.00 lebih disukai",
          },
          {
            icon: AlertCircle,
            title: "Peringatan Kesehatan",
            content:
              aqi > 150
                ? "Siapkan inhaler darurat"
                : "Pantau gejala yang muncul",
          },
        ],
        description:
          "Untuk orang dengan gangguan pernapasan atau jantung, anak-anak, dan lansia.",
      },
      elderly: {
        icon: Baby,
        recommendations: [
          {
            icon: Dumbbell,
            title: "Tingkat Aktivitas",
            content:
              aqi > 100
                ? "Aktivitas minimal di luar ruangan"
                : "Aktivitas ringan diperbolehkan",
          },
          {
            icon: Mask,
            title: "Pelindung Masker",
            content:
              aqi > 50
                ? "Selalu gunakan masker N95+ saat keluar"
                : "Direkomendasikan",
          },
          {
            icon: Clock,
            title: "Waktu di Dalam Ruangan",
            content:
              aqi > 150
                ? "Tetap di dalam ruangan sebisa mungkin"
                : "Batasi hingga 1-2 jam di luar ruangan",
          },
          {
            icon: AlertCircle,
            title: "Perawatan Medis",
            content:
              "Pantau tanda vital secara teratur, hubungi dokter jika ada gejala",
          },
        ],
        description: "Rekomendasi perawatan khusus untuk individu lanjut usia.",
      },
    };
    return adviceMap[group];
  };

  const currentAdvice = getAdvice(activeTab);
  const CurrentIcon = currentAdvice.icon;

  const getAqiStatus = () => {
    if (aqi <= 50)
      return {
        text: "Baik - Aman untuk semua aktivitas",
        color: "text-emerald-700 dark:text-emerald-300",
      };
    if (aqi <= 100)
      return {
        text: "Sedang - Kelompok sensitif sebaiknya membatasi aktivitas",
        color: "text-amber-700 dark:text-amber-300",
      };
    if (aqi <= 150)
      return {
        text: "Tidak Sehat untuk Kelompok Sensitif - Hindari aktivitas luar ruangan yang lama",
        color: "text-orange-700 dark:text-orange-300",
      };
    if (aqi <= 200)
      return {
        text: "Tidak Sehat - Semua orang sebaiknya membatasi aktivitas luar ruangan",
        color: "text-red-700 dark:text-red-300",
      };
    return {
      text: "Berbahaya - Tetap di dalam ruangan",
      color: "text-purple-700 dark:text-purple-300",
    };
  };

  const status = getAqiStatus();

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Saran Kesehatan - {city}
          </h3>
          <p className={`text-sm font-medium ${status.color}`}>{status.text}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-border">
          {(["general", "sensitive", "elderly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-[2px] ${
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "general" && "Umum"}
              {tab === "sensitive" && "Kelompok Sensitif"}
              {tab === "elderly" && "Lansia"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <CurrentIcon className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              {currentAdvice.description}
            </p>
          </div>

          <div className="space-y-3">
            {currentAdvice.recommendations.map((rec, idx) => {
              const RecIcon = rec.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-border"
                >
                  <RecIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {rec.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rec.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
