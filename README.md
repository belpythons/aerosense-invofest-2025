# AeroSense 🍃📊

> **Status:** Completed / Static Prototype - Dikembangkan khusus untuk entri kompetisi Web Design Invofest 2025.

AeroSense adalah platform dasbor kualitas udara (AQI) interaktif yang menyajikan data, prakiraan, dan rekomendasi kesehatan publik. Proyek ini memiliki fokus regional khusus untuk menyajikan wawasan polusi terperinci di wilayah Kalimantan Timur, meliputi Samarinda, Bontang, dan Balikpapan.

## ✨ Sorotan Fitur (UI/UX)
* **Interactive Leaflet Maps:** Integrasi peta interaktif dengan penanda *color-coded* (hijau hingga merah) yang menunjukkan tingkat bahaya AQI secara visual di berbagai kota.
* **Regional Comparison:** Tabel komparasi dinamis untuk membandingkan metrik kualitas udara antar kota utama di pesisir timur Kalimantan.
* **Smart Search Bar:** Fitur pencarian kota dengan *dropdown suggestions* yang responsif dan indikator status kualitas udara instan.
* **Modern Theming:** Antarmuka bersih yang mendukung transisi mulus antara mode terang (gradien *teal/emerald*) dan mode gelap (tema *slate-950*) yang nyaman di mata.

## 🛠️ Tech Stack & Dependencies
Meskipun berupa situs statis, proyek ini menggunakan teknologi modern untuk *rendering* antarmuka tingkat lanjut:
* **Framework:** Next.js 16.0.3 dengan React 19.
* **Styling & Components:** Tailwind CSS v4 dikombinasikan dengan pustaka komponen aksesibel dari Radix UI / shadcn/ui.
* **Icons & Charts:** Menggunakan Lucide React untuk ikonografi dan Recharts untuk visualisasi data.
* **Mapping:** Leaflet.js (v1.9.4) diimplementasikan secara langsung untuk meminimalkan beban *bundle size*.

## 🚀 Cara Menjalankan secara Lokal

```bash
# 1. Clone repositori ini
git clone [URL-REPOSITORI]
cd aerosense

# 2. Install semua dependensi
npm install

# 3. Jalankan server development
npm run dev
