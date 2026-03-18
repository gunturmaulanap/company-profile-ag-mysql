import type { Locale } from "@/lib/i18n";

export type GovernanceBodyTab = "audit" | "secretary";

type Localized<T> = Record<Locale, T>;

type GovernanceCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroBody: string;
  heroCta: string;
  orgEyebrow: string;
  orgTitle: string;
  orgBoardRole: string;
  orgBoardName: string;
  orgCeoRole: string;
  orgCeoName: string;
  bodiesTitle: string;
  auditTab: string;
  secretaryTab: string;
  ethicsTitle: string;
  ethicsBody: string;
  downloadLabel: string;
};

export type GovernanceLocalizedLabel = {
  id: string;
  en: string;
};

export type GovernanceDepartmentNode = {
  id: string;
  role: GovernanceLocalizedLabel;
  name: GovernanceLocalizedLabel;
};

export type GovernanceExecutiveNode = {
  id: string;
  role: GovernanceLocalizedLabel;
  name: GovernanceLocalizedLabel;
  departments: GovernanceDepartmentNode[];
};

export const governanceCopy: Localized<GovernanceCopy> = {
  id: {
    heroEyebrow: "Adibayu Group",
    heroTitle: "Governance",
    heroHighlight: "Across Pillars.",
    heroBody:
      "Pandangan yang jelas tentang bagaimana kami menyelaraskan tata kelola, strategi, dan eksekusi operasional di seluruh portofolio perusahaan.",
    heroCta: "Explore Structure",
    orgEyebrow: "Hierarki Perusahaan",
    orgTitle: "Struktur Organisasi",
    orgBoardRole: "Dewan Komisaris",
    orgBoardName: "Bambang Sudharmanto",
    orgCeoRole: "Chief Executive Officer (CEO)",
    orgCeoName: "John Dae",
    bodiesTitle: "Organ Tata Kelola",
    auditTab: "Komite Audit",
    secretaryTab: "Sekretaris Perusahaan",
    ethicsTitle: "Kode Etik & Kepatuhan",
    ethicsBody:
      "Fondasi moral yang tak tergoyahkan bagi seluruh entitas bisnis di bawah naungan Adibayu Group.",
    downloadLabel: "Unduh Dokumen",
  },
  en: {
    heroEyebrow: "Adibayu Group",
    heroTitle: "Governance",
    heroHighlight: "Across Pillars.",
    heroBody:
      "A clear view of how we align governance, strategy, and operational execution across the company portfolio.",
    heroCta: "Explore Structure",
    orgEyebrow: "Corporate Hierarchy",
    orgTitle: "Organizational Structure",
    orgBoardRole: "Board of Commissioners",
    orgBoardName: "Bambang Sudharmanto",
    orgCeoRole: "Chief Executive Officer (CEO)",
    orgCeoName: "John Dae",
    bodiesTitle: "Governance Bodies",
    auditTab: "Audit Committee",
    secretaryTab: "Corporate Secretary",
    ethicsTitle: "Code of Conduct & Compliance",
    ethicsBody:
      "An unwavering moral foundation for every business entity under Adibayu Group.",
    downloadLabel: "Download Document",
  },
};

export const governanceHeroSlides = [
  {
    id: "manufacture",
    title: { id: "MANUFAKTUR", en: "MANUFACTURING" },
    desc: {
      id: "Standardisasi keselamatan kerja, manajemen limbah, dan kepatuhan rantai pasok global.",
      en: "Workplace safety standardization, waste management, and global supply-chain compliance.",
    },
    image: "slider-2",
  },
  {
    id: "distribution",
    title: { id: "DISTRIBUSI", en: "DISTRIBUTION" },
    desc: {
      id: "Kepatuhan logistik, anti-penyuapan, dan efisiensi jejak karbon armada secara presisi.",
      en: "Logistics compliance, anti-bribery controls, and precise fleet carbon-footprint efficiency.",
    },
    image: "slider-3",
  },
  {
    id: "retail",
    title: { id: "RITEL", en: "RETAIL" },
    desc: {
      id: "Keamanan privasi data konsumen dan praktik pemasaran yang beretika serta transparan.",
      en: "Consumer data privacy protection and ethical, transparent marketing practices.",
    },
    image: "slider-4",
  },
] as const;

export const governanceOrgExecutives: GovernanceExecutiveNode[] = [
  {
    id: "coo",
    role: {
      id: "Chief Operating Officer (COO)",
      en: "Chief Operating Officer (COO)",
    },
    name: { id: "Michael Pratama", en: "Michael Pratama" },
    departments: [
      {
        id: "supply-chain",
        role: { id: "Head of Supply Chain", en: "Head of Supply Chain" },
        name: { id: "Rizky Maulana", en: "Rizky Maulana" },
      },
      {
        id: "manufacturing-ops",
        role: {
          id: "Head of Manufacturing Operations",
          en: "Head of Manufacturing Operations",
        },
        name: { id: "Andri Saputra", en: "Andri Saputra" },
      },
      {
        id: "quality-hse",
        role: { id: "Head of Quality & HSE", en: "Head of Quality & HSE" },
        name: { id: "Dian Kurnia", en: "Dian Kurnia" },
      },
    ],
  },
  {
    id: "cfo",
    role: {
      id: "Chief Financial Officer (CFO)",
      en: "Chief Financial Officer (CFO)",
    },
    name: { id: "Stefani Gunawan", en: "Stefani Gunawan" },
    departments: [
      {
        id: "finance-control",
        role: { id: "Head of Finance Control", en: "Head of Finance Control" },
        name: { id: "Yudi Hartono", en: "Yudi Hartono" },
      },
      {
        id: "treasury",
        role: { id: "Head of Treasury", en: "Head of Treasury" },
        name: { id: "Nadya Lestari", en: "Nadya Lestari" },
      },
      {
        id: "tax-compliance",
        role: {
          id: "Head of Tax & Compliance",
          en: "Head of Tax & Compliance",
        },
        name: { id: "Farhan Akbar", en: "Farhan Akbar" },
      },
    ],
  },
] as const;

export const governanceBodies = {
  audit: {
    name: { id: "Bpk. Hendra Wijaya", en: "Mr. Hendra Wijaya" },
    role: { id: "Ketua Komite Audit", en: "Head of Audit Committee" },
    bio: {
      id: "Bertugas membantu Dewan Komisaris dalam memastikan efektivitas sistem pengendalian internal, manajemen risiko, dan integritas laporan keuangan perusahaan.",
      en: "Supports the Board of Commissioners in ensuring effective internal controls, risk management, and financial reporting integrity.",
    },
    points: {
      id: [
        "Menelaah informasi keuangan yang akan diterbitkan",
        "Menelaah ketaatan terhadap peraturan perundang-undangan",
        "Memberikan rekomendasi penunjukan Akuntan Publik",
        "Mengevaluasi pelaksanaan audit internal",
      ],
      en: [
        "Review published financial disclosures",
        "Review compliance with laws and regulations",
        "Recommend Public Accountant appointment",
        "Evaluate internal audit implementation",
      ],
    },
  },
  secretary: {
    name: { id: "Ibu Sarah Adiningtyas", en: "Ms. Sarah Adiningtyas" },
    role: { id: "Corporate Secretary", en: "Corporate Secretary" },
    email: "corsec@adibayugroup.com",
    bio: {
      id: "Berperan sebagai penghubung (liaison officer) antara Perusahaan dengan lembaga pemerintah, investor, dan publik untuk memastikan kepatuhan regulasi pasar modal.",
      en: "Acts as liaison between the Company and regulators, investors, and the public to ensure capital-market compliance.",
    },
    points: {
      id: [
        "Memastikan keterbukaan informasi publik",
        "Mendampingi Direksi dalam RUPS",
        "Menjaga hubungan dengan Otoritas Jasa Keuangan (OJK)",
        "Mengelola dokumentasi legal korporasi",
      ],
      en: [
        "Ensure public information disclosure",
        "Support the Board during shareholder meetings",
        "Maintain relation with Financial Services Authority",
        "Manage corporate legal documentation",
      ],
    },
  },
} as const;

export const governanceEthicsCards = {
  integrity: {
    title: { id: "Integritas Total", en: "Total Integrity" },
    body: {
      id: "Toleransi nol (zero tolerance) terhadap segala bentuk penyuapan, gratifikasi, dan korupsi di semua tingkatan operasional.",
      en: "Zero tolerance for bribery, gratification, and corruption across all operational levels.",
    },
  },
  conflict: {
    title: { id: "Benturan Kepentingan", en: "Conflict of Interest" },
    body: {
      id: "Keputusan bisnis murni didasarkan pada kepentingan terbaik holding, bebas dari preferensi pribadi maupun afiliasi keluarga.",
      en: "Business decisions are made solely on the holding's best interest, free from personal preferences and family affiliation.",
    },
  },
  protection: {
    title: { id: "Perlindungan Aset & Data", en: "Asset & Data Protection" },
    body: {
      id: "Menjaga kerahasiaan mahadata konsumen ritel dan melindungi kekayaan intelektual inovasi manufaktur dari kebocoran informasi.",
      en: "Protect retail consumer big data confidentiality and safeguard manufacturing intellectual property from leakage.",
    },
  },
} as const;
