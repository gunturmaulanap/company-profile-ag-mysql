import type { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Adibayu Group",
  description:
    "Get in touch with the Adibayu Group team. We're here to help answer your questions and support your needs.",
};

export default function LocalizedContactPage() {
  return <ContactPageClient />;
}
