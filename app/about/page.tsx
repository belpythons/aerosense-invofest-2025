"use client";

import { useState, useEffect } from "react";
import {
  Wind,
  Target,
  TrendingUp,
  Award,
  Users,
  Globe2,
  Heart,
  Leaf,
  Shield,
  Droplet,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { HeaderNav } from "@/components/header-nav";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/cta-section";

export default function AboutPage() {
  const [stats, setStats] = useState({
    citiesMonitored: 0,
    usersServed: 0,
    dataPoints: 0,
    yearsActive: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        citiesMonitored: Math.floor(50 * progress),
        usersServed: Math.floor(100000 * progress),
        dataPoints: Math.floor(1000000 * progress),
        yearsActive: Math.floor(5 * progress),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Environmental Scientist",
      image: "/scientist-in-lab.png",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Technology",
      image: "/diverse-engineers-meeting.png",
    },
    {
      name: "Emma Thompson",
      role: "Data Analytics Lead",
      image: "/data-scientist.jpg",
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      image: "/diverse-team-manager.png",
    },
  ];

  const partners = [
    "Environmental Protection Agency",
    "WHO Air Quality Initiative",
    "Green Tech Foundation",
    "Global Climate Alliance",
    "Clean Air Partnership",
    "Sustainability Network",
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />

      {/* Hero Section */}
      <section className="pt-32  px-6 bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Misi Kami
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-balance">
            Kami percaya setiap orang berhak menghirup udara bersih. AeroSense
            didedikasikan untuk menyediakan data kualitas udara real-time yang
            akurat untuk memberdayakan komunitas di seluruh dunia membuat
            keputusan yang tepat tentang kesehatan dan lingkungan mereka.
          </p>
        </div>
      </section>

      {/* Image Cards Section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Komitmen Kami</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Kami bekerja untuk menciptakan masa depan di mana udara bersih dapat diakses oleh semua orang
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden group">
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 relative overflow-hidden">
                <img
                  src="/environmental-monitoring-technology-clean-air.jpg"
                  alt="Environmental Monitoring"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-teal-600 dark:text-teal-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  Perlindungan Kesehatan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Memberikan data akurat untuk melindungi kesehatan masyarakat
                  dari polusi udara
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900 relative overflow-hidden">
                <img
                  src="/green-sustainable-environment-nature.jpg"
                  alt="Sustainable Environment"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  Keberlanjutan Lingkungan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mendukung upaya pelestarian lingkungan melalui pemantauan
                  berkelanjutan
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 relative overflow-hidden">
                <img
                  src="/clean-fresh-water-droplet-purification.jpg"
                  alt="Clean Air Initiative"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">
                  Udara Bersih untuk Semua
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mewujudkan akses universal terhadap informasi kualitas udara
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden group md:col-span-3 lg:col-span-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 relative overflow-hidden">
                <img
                  src="/travel-adventure-exploration-tourism.jpg"
                  alt="Travel with Air Quality"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <Globe2 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">Perjalanan Cerdas</h3>
                <p className="text-sm text-muted-foreground">
                  Rencanakan perjalanan Anda dengan informasi kualitas udara
                  real-time
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Impact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Dampak Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-8 text-center">
              <Globe2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">
                {stats.citiesMonitored}+
              </p>
              <p className="text-muted-foreground">Kota Dipantau</p>
            </Card>
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">
                {stats.usersServed.toLocaleString()}+
              </p>
              <p className="text-muted-foreground">Pengguna Terlayani</p>
            </Card>
            <Card className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">
                {stats.dataPoints.toLocaleString()}+
              </p>
              <p className="text-muted-foreground">Titik Data</p>
            </Card>
            <Card className="p-8 text-center">
              <Award className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">{stats.yearsActive}+</p>
              <p className="text-muted-foreground">Tahun Aktif</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Perjalanan Kami
          </h2>
          <div className="space-y-8">
            {[
              {
                year: "2020",
                title: "Pendirian",
                desc: "AeroSense didirikan dengan visi untuk mendemokratisasi data kualitas udara.",
              },
              {
                year: "2021",
                title: "Ekspansi",
                desc: "Memperluas jaringan pemantauan ke 20 kota di berbagai wilayah.",
              },
              {
                year: "2022",
                title: "Inovasi",
                desc: "Meluncurkan aplikasi seluler real-time dan platform analitik canggih.",
              },
              {
                year: "2023",
                title: "Pengakuan",
                desc: "Menerima Penghargaan Teknologi Lingkungan untuk dampak terhadap kesehatan masyarakat.",
              },
              {
                year: "2024",
                title: "Jangkauan Global",
                desc: "Kini memantau 50+ kota dengan 100.000+ pengguna aktif di seluruh dunia.",
              },
            ].map((milestone, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < 4 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Temui Tim Kami
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Tim kami yang beragam terdiri dari ilmuwan, insinyur, dan advokat
            lingkungan yang bekerja tanpa lelah untuk memberikan data kualitas
            udara yang paling akurat.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow p-0"
              >
                <div className="aspect-square bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Mitra Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-border hover:border-teal-500 transition-colors"
              >
                <p className="text-sm font-medium text-center">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Bergabunglah dengan Gerakan"
        description="Bantu kami membangun masa depan yang lebih bersih dan sehat untuk semua orang. Mulai pantau kualitas udara Anda hari ini."
        primaryButtonText="Mulai Sekarang"
        primaryButtonLink="/#cities"
        secondaryButtonText="Baca Blog Kami"
        secondaryButtonLink="/news"
        backgroundImage="/community-people-together-unity.jpg"
      />

      <Footer />
    </div>
  );
}
