import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

export type WhoWeArePageCopy = {
  heroTitle: string;
  heroSubtitle: string;
  sectors: string[];
  snapshotEyebrow: string;
  snapshotTitle: string;
  snapshotBody: string;
  portfolioTitle: string;
  portfolioReadMore: string;
  portfolioShowLess: string;
  visionTitle: string;
  visionBody: string;
  visionSupporting: string;
  missionTitle: string;
  missionHeadline: string;
  missionPoints: string[];
  valuesTitle: string;
  valuesPrevLabel: string;
  valuesNextLabel: string;
  presenceTabTitle: string;
  presenceMapAlt: string;
  presenceLead: string;
  presenceStatLine1: string;
  presenceStatLine2: string;
  leadershipTitle: string;
  leadershipSubtitle: string;
};

export const whoWeAreCopy: Localized<WhoWeArePageCopy> = {
  en: {
    heroTitle: "Worldwide Growth. Barokah Principles.",
    heroSubtitle:
      "The company was established under the name PT. Adibayu Gajah Semakmur on February 5, 2024. It is a holding company that oversees three business areas, namely manufacturing, distribution, and retail. The company is committed to growing together with all of its entities to shape the nation's future generations.",
    sectors: ["Manufacturing", "Distribution", "Retail"],
    snapshotEyebrow: "Group Snapshot",
    snapshotTitle: "About Adibayu Group",
    snapshotBody:
      "We provide strategic oversight, governance standards, and capability integration so each enterprise can scale with stronger execution discipline and long-term value orientation.",
    portfolioTitle: "Adibayu Group Holding",
    portfolioReadMore: "Read More",
    portfolioShowLess: "Show Less",
    visionTitle: "Vision",
    visionBody:
      "To Be World Wide Company In Every Category Business With The Barokah Way.",
    visionSupporting:
      "We are a team of experienced professionals dedicated to helping each business pillar navigate complexity, while applying barokah principles in every strategic step.",
    missionTitle: "Mission",
    missionHeadline: "Innovative Solutions For Modern Industry Needs",
    missionPoints: [
      "Create a better future every day.",
      "Provide comfort and a better quality of life through brands and services for consumers.",
      "Inspire people to take small steps that can bring positive change to the world.",
      "Continuously innovate in business so we can grow faster while still paying attention to environmental sustainability.",
    ],
    valuesTitle: "Our Values",
    valuesPrevLabel: "Previous value",
    valuesNextLabel: "Next value",
    presenceTabTitle: "Distribution Centers",
    presenceMapAlt: "Adibayu Group Distribution Centers in Indonesia",
    presenceLead: "Adibayu Group distribution networks operate across",
    presenceStatLine1: "7 cities in",
    presenceStatLine2: "Indonesia",
    leadershipTitle: "Leadership",
    leadershipSubtitle:
      "Experienced institutional leadership guiding group strategy, governance, and execution rhythm.",
  },
  id: {
    heroTitle: "Tentang Kami",
    heroSubtitle:
      "Perseroan didirikan dengan nama PT. Adibayu Gajah Semakmur pada tanggal 5 Februari 2024. Menjadi sebuah holding company yang menaungi tiga bidang perusahaan yakni manufaktur, distribusi, dan retail. Perusahaan berkomitmen untuk berkembang bersama seluruh entitas perusahaan untuk membentuk generasi bangsa.",
    sectors: ["Manufaktur", "Distribusi", "Ritel"],
    snapshotEyebrow: "Ringkasan Grup",
    snapshotTitle: "Tentang Adibayu Group",
    snapshotBody:
      "Kami menghadirkan arahan strategis, standar tata kelola, dan integrasi kapabilitas agar setiap entitas dapat bertumbuh dengan disiplin eksekusi yang kuat serta orientasi nilai jangka panjang.",
    portfolioTitle: "Holding Adibayu Group",
    portfolioReadMore: "Baca Selengkapnya",
    portfolioShowLess: "Tampilkan Ringkas",
    visionTitle: "Visi",
    visionBody:
      "Menjadi Perusahaan Global di Setiap Bidang Usaha dengan Cara Barokah.",
    visionSupporting:
      "Kami adalah tim profesional berpengalaman yang membantu setiap pilar bisnis menghadapi kompleksitas, sambil menerapkan prinsip barokah dalam setiap langkah strategis.",
    missionTitle: "Misi",
    missionHeadline: "Solusi Inovatif untuk Kebutuhan Industri Modern",
    missionPoints: [
      "Ciptakan masa depan yang lebih baik setiap hari.",
      "Memberikan rasa nyaman dan kualitas hidup yang baik melalui merek dan layanan kepada konsumen.",
      "Menginspirasi orang untuk mengambil langkah kecil yang dapat membawa perubahan positif bagi dunia.",
      "Selalu berinovasi dalam bisnis agar kita dapat tumbuh lebih cepat sambil tetap memperhatikan dampak terhadap keberlanjutan lingkungan.",
    ],
    valuesTitle: "Nilai Kami",
    valuesPrevLabel: "Nilai sebelumnya",
    valuesNextLabel: "Nilai berikutnya",
    presenceTabTitle: "Pusat Distribusi",
    presenceMapAlt: "Pusat Distribusi Adibayu Group di Indonesia",
    presenceLead: "Jaringan distribusi Adibayu Group beroperasi di",
    presenceStatLine1: "7 kota di",
    presenceStatLine2: "Indonesia",
    leadershipTitle: "Kepemimpinan",
    leadershipSubtitle:
      "Kepemimpinan institusional berpengalaman yang mengarahkan strategi grup, tata kelola, dan ritme eksekusi.",
  },
};

export const whoWeAreValues = [
  {
    id: "F",
    icon: "F",
    color: "text-[#ff66c4]",
    title: { en: "Family", id: "Family" },
    desc: {
      en: "We build trust, care, and a sense of belonging across every team and entity.",
      id: "Kami membangun kepercayaan, kepedulian, dan rasa memiliki di setiap tim dan entitas.",
    },
  },
  {
    id: "A",
    icon: "A",
    color: "text-[#ffde59]",
    title: { en: "Achievement", id: "Achievement" },
    desc: {
      en: "We pursue measurable results with discipline, consistency, and strong execution.",
      id: "Kami mengejar hasil yang terukur dengan disiplin, konsistensi, dan eksekusi yang kuat.",
    },
  },
  {
    id: "S",
    icon: "S",
    color: "text-[#8c52ff]",
    title: { en: "Spirituality", id: "Spirituality" },
    desc: {
      en: "We uphold integrity and purpose by grounding our actions in meaningful values.",
      id: "Kami menjaga integritas dan tujuan dengan menautkan setiap tindakan pada nilai yang bermakna.",
    },
  },
  {
    id: "T",
    icon: "T",
    color: "text-[#5271ff]",
    title: { en: "Teamwork", id: "Teamwork" },
    desc: {
      en: "We collaborate across functions and companies to create stronger collective impact.",
      id: "Kami berkolaborasi lintas fungsi dan perusahaan untuk menciptakan dampak kolektif yang lebih kuat.",
    },
  },
] as const;

export const whoWeArePortfolioCompanies = [
  {
    id: "aksamala",
    name: "Aksamala Adi Andana",
    category: { en: "Manufacturing", id: "Manufaktur" },
    summary: {
      en: "Aksamala is an operational entity under Adibayu Group focused on the manufacturing pillar, delivering innovative and reliable solutions with strong governance standards.",
      id: "Aksamala merupakan entitas operasional di bawah naungan Adibayu Group yang berfokus pada pilar manufaktur, menghadirkan solusi inovatif dan andal dengan standar tata kelola yang kuat.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nakama",
    name: "Nakama Alam Asri",
    category: { en: "Retail Herbal", id: "Ritel Herbal" },
    summary: {
      en: "Nakama develops herbal retail products and experiences designed to improve everyday wellness through quality and trusted service.",
      id: "Nakama mengembangkan produk dan pengalaman ritel herbal yang dirancang untuk meningkatkan kualitas hidup sehari-hari melalui mutu dan layanan terpercaya.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "habbie",
    name: "Habbie",
    category: { en: "FMCG Aromatic", id: "FMCG Aromatik" },
    summary: {
      en: "Habbie builds aromatic FMCG offerings that combine market relevance, product consistency, and scalable distribution.",
      id: "Habbie membangun produk FMCG aromatik yang memadukan relevansi pasar, konsistensi produk, dan distribusi yang skalabel.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "achievement",
    name: "Achievement Abadi Logistik",
    category: { en: "Distribution", id: "Distribusi" },
    summary: {
      en: "Achievement strengthens distribution execution with reliable fulfillment, route optimization, and disciplined service-level management.",
      id: "Achievement memperkuat eksekusi distribusi melalui pemenuhan yang andal, optimasi rute, dan pengelolaan tingkat layanan yang disiplin.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "satyalaksana",
    name: "Satyalaksana Adibadri",
    category: { en: "Retail FMCG", id: "Ritel FMCG" },
    summary: {
      en: "Satyalaksana manages FMCG retail channels to ensure product accessibility, customer focus, and sustainable commercial growth.",
      id: "Satyalaksana mengelola kanal ritel FMCG untuk memastikan akses produk, fokus pelanggan, dan pertumbuhan komersial berkelanjutan.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "realhe",
    name: "Realhe",
    category: { en: "Digital Growth", id: "Pertumbuhan Digital" },
    summary: {
      en: "Realhe accelerates digital growth initiatives by combining data-driven marketing, agile experimentation, and cross-channel execution.",
      id: "Realhe mempercepat inisiatif pertumbuhan digital melalui kombinasi pemasaran berbasis data, eksperimen agile, dan eksekusi lintas kanal.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const whoWeAreLeadershipCards = [
  {
    role: {
      en: "Chief Executive Officer",
      id: "Chief Executive Officer",
    },
    bio: {
      en: "Leads group-level strategic alignment and enterprise performance agenda.",
      id: "Memimpin penyelarasan strategis tingkat grup dan agenda kinerja perusahaan.",
    },
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
  },
  {
    role: {
      en: "Chief Operating Officer",
      id: "Chief Operating Officer",
    },
    bio: {
      en: "Oversees operational integration across manufacturing, distribution, and retail units.",
      id: "Mengawasi integrasi operasional lintas unit manufaktur, distribusi, dan ritel.",
    },
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80",
  },
  {
    role: {
      en: "Chief Finance Officer",
      id: "Chief Finance Officer",
    },
    bio: {
      en: "Guides portfolio finance, governance architecture, and long-range value creation plans.",
      id: "Mengarahkan keuangan portofolio, arsitektur tata kelola, dan rencana penciptaan nilai jangka panjang.",
    },
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
  },
] as const;

export const whoWeAreDistributionCenters = [
  {
    name: "Medan",
    top: "25%",
    left: "12%",
    mobileTop: "32%",
    mobileLeft: "10%",
  },
  {
    name: "Bekasi",
    top: "73.5%",
    left: "29.5%",
    mobileTop: "64.5%",
    mobileLeft: "28.5%",
  },
  {
    name: "Bandung",
    top: "75.5%",
    left: "31.5%",
    mobileTop: "66%",
    mobileLeft: "31%",
  },
  {
    name: "Kudus",
    top: "74%",
    left: "38%",
    mobileTop: "64.5%",
    mobileLeft: "37.5%",
  },
  {
    name: "Solo",
    top: "76%",
    left: "38.5%",
    mobileTop: "66.5%",
    mobileLeft: "38.2%",
  },
  {
    name: "Jogja",
    top: "77.5%",
    left: "38%",
    mobileTop: "68%",
    mobileLeft: "37.5%",
  },
  {
    name: "Surabaya",
    top: "78%",
    left: "42%",
    mobileTop: "68.4%",
    mobileLeft: "41.2%",
  },
  {
    name: "Makassar",
    top: "53%",
    left: "54%",
    mobileTop: "54%",
    mobileLeft: "53.2%",
  },
] as const;
