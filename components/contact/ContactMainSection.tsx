import { motion } from "framer-motion";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import { sectionVariants } from "@/components/contact/contact-content";
import type { ContactLocale, FormData } from "@/components/contact/types";

type ContactMainSectionProps = {
  locale: ContactLocale;
  isIOS: boolean;
  formData: FormData;
  onChange: (name: keyof FormData, value: string) => void;
  onCaptchaChange: (token: string | null) => void; // <-- Tambahkan tipe ini
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitMessage?: string | null;
  submitStatus?: "success" | "error" | null;
};

export default function ContactMainSection({
  locale,
  isIOS,
  formData,
  onChange,
  onCaptchaChange, // <-- Destructure
  onReset,
  onSubmit,
  isSubmitting = false,
  submitMessage = null,
  submitStatus = null,
}: ContactMainSectionProps) {
  return (
    <section className="bg-[#e1ecef] relative pt-32 md:pt-40 pb-20 md:pb-28">
      <motion.div
        className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <ContactInfoSection locale={locale} isIOS={isIOS} />
          <ContactFormSection
            locale={locale}
            formData={formData}
            onChange={onChange}
            onCaptchaChange={onCaptchaChange} // <-- Teruskan ke Form
            onReset={onReset}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            submitStatus={submitStatus}
          />
        </div>
      </motion.div>
    </section>
  );
}
