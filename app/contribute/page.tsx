'use client'

import { Cloud, Users, BookOpen, Zap, Target, Heart, TrendingUp, Globe2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HeaderNav } from '@/components/header-nav'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'

export default function ContributePage() {
  const sections = [
    {
      icon: Cloud,
      title: 'Jadilah Kontributor Data Kualitas Udara',
      description: 'Bantu kami memperluas jaringan pemantauan dengan berkontribusi data dari sensor Anda sendiri. Bersama-sama kita dapat menciptakan peta kualitas udara yang lebih akurat dan komprehensif.',
      points: [
        'Pasang sensor kualitas udara di lokasi Anda',
        'Bagikan data secara otomatis ke platform kami',
        'Dapatkan akses ke analitik tingkat lanjut',
        'Bantu komunitas lokal Anda membuat keputusan yang lebih baik',
      ],
    },
    {
      icon: Users,
      title: 'Bergabunglah dengan Komunitas Udara Bersih',
      description: 'Menjadi bagian dari gerakan global untuk udara yang lebih bersih. Terhubung dengan individu dan organisasi yang berpikiran sama yang berkomitmen untuk meningkatkan kualitas udara.',
      points: [
        'Ikuti acara dan lokakarya komunitas',
        'Bagikan pengetahuan dan pengalaman Anda',
        'Berkolaborasi dalam proyek lokal',
        'Advokasi untuk kebijakan udara bersih',
      ],
    },
    {
      icon: BookOpen,
      title: 'Sumber Daya Iklim dan Udara',
      description: 'Akses materi pendidikan, panduan, dan alat untuk memahami dampak kualitas udara terhadap kesehatan dan lingkungan.',
      points: [
        'Panduan komprehensif tentang polutan udara',
        'Alat analisis data untuk peneliti',
        'Materi edukasi untuk sekolah dan komunitas',
        'Laporan penelitian terbaru dan studi kasus',
      ],
    },
    {
      icon: Zap,
      title: 'Program Pemantauan Udara AeroSense',
      description: 'Ikuti program pemantauan udara kami dan dapatkan dukungan untuk mengimplementasikan solusi pemantauan di wilayah Anda.',
      points: [
        'Bantuan teknis untuk instalasi sensor',
        'Pelatihan manajemen dan analisis data',
        'Dukungan pendanaan untuk proyek komunitas',
        'Sertifikasi dan pengakuan kontributor',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Aksi & Kontribusi
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-balance">
              Bergabunglah dengan kami dalam misi untuk menciptakan udara yang lebih bersih dan sehat untuk semua. Kontribusi Anda membuat perbedaan nyata.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <Globe2 className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">1,200+</p>
                <p className="text-sm text-muted-foreground">Kontributor Aktif</p>
              </Card>
              <Card className="p-6 text-center">
                <Cloud className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">5,000+</p>
                <p className="text-sm text-muted-foreground">Sensor Terpasang</p>
              </Card>
              <Card className="p-6 text-center">
                <TrendingUp className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">150M+</p>
                <p className="text-sm text-muted-foreground">Data Points</p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">85+</p>
                <p className="text-sm text-muted-foreground">Negara</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                      </div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {section.description}
                    </p>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                      Pelajari Lebih Lanjut
                    </Button>
                  </div>
                  <Card className="p-6">
                    <ul className="space-y-4">
                      {section.points.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-teal-600" />
                          </div>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Siap Membuat Perbedaan?"
          description="Mulai perjalanan Anda untuk berkontribusi pada udara yang lebih bersih hari ini. Setiap kontribusi membuat dampak nyata."
          primaryButtonText="Daftar Sebagai Kontributor"
          primaryButtonLink="/contribute"
          secondaryButtonText="Hubungi Kami"
          secondaryButtonLink="/contact"
          backgroundImage="/volunteers-helping-environment-community.jpg"
        />
      </div>

      <Footer />
    </div>
  )
}
