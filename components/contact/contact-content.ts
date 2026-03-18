import { Mail, Phone, type LucideIcon } from "lucide-react";
import type { ContactLocale } from "@/components/contact/types";

type LocalizedText = Record<ContactLocale, string>;

export type ContactOption = {
  value: string;
  label: LocalizedText;
};

export type ContactInfoItem = {
  type: "email" | "phone";
  value: string;
  icon: LucideIcon;
  label: LocalizedText;
};

export const contactText = {
  eyebrow: {
    id: "Hubungi Kami",
    en: "Get In Touch",
  },
  titleLine1: {
    id: "Hubungi",
    en: "Contact",
  },
  titleLine2: {
    id: "Tim Kami",
    en: "The Team",
  },
  description: {
    id: "Apabila Anda memiliki pertanyaan mengenai operasional, kemitraan, atau hubungan investor, tim kami siap membantu seluruh kebutuhan Anda.",
    en: "Whether you have a question about our operations, partnerships, or investor relations, our team is ready to answer all your inquiries.",
  },
  imageAlt: {
    id: "Gedung Kantor Korporat",
    en: "Corporate Building",
  },
  imageCaptionTitle: {
    id: "Adibayu Group",
    en: "Adibayu Group",
  },
  imageCaptionSubtitle: {
    id: "Kantor Pusat",
    en: "Headquarters",
  },
  fields: {
    name: {
      id: "Nama Anda *",
      en: "Your Name *",
    },
    category: {
      id: "Kategori *",
      en: "Category *",
    },
    email: {
      id: "Email *",
      en: "Email *",
    },
    phone: {
      id: "Telepon *",
      en: "Phone *",
    },
    job: {
      id: "Fungsi Pekerjaan *",
      en: "Job Function *",
    },
    company: {
      id: "Perusahaan *",
      en: "Company *",
    },
    city: {
      id: "Kota *",
      en: "City *",
    },
    country: {
      id: "Negara *",
      en: "Country *",
    },
    subject: {
      id: "Subjek *",
      en: "Subject *",
    },
    message: {
      id: "Pesan *",
      en: "Message *",
    },
  },
  placeholders: {
    name: {
      id: "Masukkan nama Anda",
      en: "Enter your name",
    },
    category: {
      id: "Pilih kategori",
      en: "Select category",
    },
    email: {
      id: "nama@email.com",
      en: "your@email.com",
    },
    phone: {
      id: "+62 xxx xxxx xxxx",
      en: "+62 xxx xxxx xxxx",
    },
    job: {
      id: "Pilih fungsi pekerjaan",
      en: "Select job",
    },
    company: {
      id: "Nama perusahaan Anda",
      en: "Your company name",
    },
    city: {
      id: "Kota Anda",
      en: "Your city",
    },
    country: {
      id: "Pilih negara",
      en: "Select country",
    },
    subject: {
      id: "Topik pesan Anda",
      en: "What is this regarding?",
    },
    message: {
      id: "Bagaimana kami dapat membantu Anda?",
      en: "How can we help you?",
    },
  },
  buttons: {
    reset: {
      id: "Reset Form",
      en: "Reset Form",
    },
    submit: {
      id: "Kirim Pesan",
      en: "Send Message",
    },
  },
} as const;

export const categories: ContactOption[] = [
  {
    value: "general-inquiry",
    label: { id: "Pertanyaan Umum", en: "General Inquiry" },
  },
  {
    value: "business-partnership",
    label: { id: "Kemitraan Bisnis", en: "Business Partnership" },
  },
  {
    value: "investor-relations",
    label: { id: "Hubungan Investor", en: "Investor Relations" },
  },
  {
    value: "media-press",
    label: { id: "Media & Pers", en: "Media & Press" },
  },
  {
    value: "careers",
    label: { id: "Karier", en: "Careers" },
  },
  {
    value: "technical-support",
    label: { id: "Dukungan Teknis", en: "Technical Support" },
  },
  {
    value: "other",
    label: { id: "Lainnya", en: "Other" },
  },
];

export const jobs: ContactOption[] = [
  { value: "development", label: { id: "Pengembangan", en: "Development" } },
  { value: "design", label: { id: "Desain", en: "Design" } },
  { value: "marketing", label: { id: "Pemasaran", en: "Marketing" } },
  {
    value: "customer-service",
    label: { id: "Layanan Pelanggan", en: "Customer Service" },
  },
  { value: "operations", label: { id: "Operasional", en: "Operations" } },
  { value: "finance", label: { id: "Keuangan", en: "Finance" } },
  { value: "management", label: { id: "Manajemen", en: "Management" } },
];

export const countries: ContactOption[] = [
  { value: "indonesia", label: { id: "Indonesia", en: "Indonesia" } },
  { value: "singapore", label: { id: "Singapura", en: "Singapore" } },
  { value: "malaysia", label: { id: "Malaysia", en: "Malaysia" } },
  { value: "thailand", label: { id: "Thailand", en: "Thailand" } },
  { value: "vietnam", label: { id: "Vietnam", en: "Vietnam" } },
  { value: "philippines", label: { id: "Filipina", en: "Philippines" } },
  { value: "other", label: { id: "Lainnya", en: "Other" } },
];

export const contactInfo: ContactInfoItem[] = [
  {
    type: "email",
    value: "corcomm@adibayu.com",
    icon: Mail,
    label: { id: "Komunikasi Korporat", en: "Corporate Communication" },
  },
  // {
  //   type: "email",
  //   value: "investor@adibayu.co.id",
  //   icon: Mail,
  //   label: { id: "Hubungan Investor", en: "Investor Relations" },
  // },
  {
    type: "phone",
    value: "(021) 50843888",
    icon: Phone,
    label: { id: "Komunikasi Korporat", en: "Corporate Communication" },
  },
  // {
  //   type: "phone",
  //   value: "(021) 65304957",
  //   icon: Phone,
  //   label: { id: "Sekretaris Perusahaan", en: "Corporate Secretary" },
  // },
];

export const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};
