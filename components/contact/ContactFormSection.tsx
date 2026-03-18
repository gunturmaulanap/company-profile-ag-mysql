import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  categories,
  contactText,
  countries,
  itemVariants,
  jobs,
} from "@/components/contact/contact-content";
import type { ContactLocale, FormData } from "@/components/contact/types";

type ContactFormSectionProps = {
  locale: ContactLocale;
  formData: FormData;
  onChange: (name: keyof FormData, value: string) => void;
  onCaptchaChange: (token: string | null) => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitMessage?: string | null;
  submitStatus?: "success" | "error" | null;
};

export default function ContactFormSection({
  locale,
  formData,
  onChange,
  onCaptchaChange,
  onReset,
  onSubmit,
  isSubmitting = false,
  submitMessage = null,
  submitStatus = null,
}: ContactFormSectionProps) {
  const [captchaBlocked, setCaptchaBlocked] = useState(false);

  // Ambil Site Key dari Environment Variable (fallback string kosong agar aman)
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const contactSelectContentClass =
    "rounded-none border border-gray-200 bg-white text-navy shadow-xl";

  const requiredFields: (keyof FormData)[] = [
    "name",
    "category",
    "email",
    "phone",
    "job",
    "company",
    "city",
    "country",
    "subject",
    "message",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    const hasEmptyField = requiredFields.some(
      (field) => !String(formData[field] ?? "").trim(),
    );

    if (hasEmptyField) {
      e.preventDefault();
      window.alert("Tolong isi semua data sebelum mengirimkan pesan!");
      return;
    }

    onSubmit(e);
  };

  return (
    <motion.div className="lg:col-span-7" variants={itemVariants}>
      <div className="bg-white p-8 md:p-14 shadow-2xl border border-gray-100">
        {submitStatus === "success" ? (
          <div className="mb-6 border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
            <p className="text-sm font-semibold">Thank you!</p>
            <p className="mt-1 text-sm">
              Your message has been sent; the Adibayu team will respond to your
              message shortly.
            </p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NAME */}
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.name[locale]}
              </Label>
              <Input
                id="name"
                suppressHydrationWarning
                value={formData.name}
                onChange={(e) => onChange("name", e.target.value)}
                required
                placeholder={contactText.placeholders.name[locale]}
                className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-navy focus-visible:ring-0"
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-3">
              <Label
                htmlFor="category"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.category[locale]}
              </Label>
              <Select
                value={formData.category}
                onValueChange={(val) => onChange("category", val ?? "")}
                required
              >
                <SelectTrigger
                  suppressHydrationWarning
                  className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus:ring-0"
                >
                  <SelectValue
                    placeholder={contactText.placeholders.category[locale]}
                  />
                </SelectTrigger>
                <SelectContent className={contactSelectContentClass}>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* EMAIL */}
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.email[locale]}
              </Label>
              <Input
                id="email"
                type="email"
                suppressHydrationWarning
                value={formData.email}
                onChange={(e) => onChange("email", e.target.value)}
                required
                placeholder={contactText.placeholders.email[locale]}
                className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-navy focus-visible:ring-0"
              />
            </div>

            {/* PHONE */}
            <div className="space-y-3">
              <Label
                htmlFor="phone"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.phone[locale]}
              </Label>
              <Input
                id="phone"
                type="tel"
                suppressHydrationWarning
                value={formData.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                required
                placeholder={contactText.placeholders.phone[locale]}
                className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-navy focus-visible:ring-0"
              />
            </div>

            {/* JOB FUNCTION */}
            <div className="space-y-3">
              <Label
                htmlFor="job"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.job[locale]}
              </Label>
              <Select
                value={formData.job}
                onValueChange={(val) => onChange("job", val ?? "")}
                required
              >
                <SelectTrigger
                  suppressHydrationWarning
                  className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus:ring-0"
                >
                  <SelectValue
                    placeholder={contactText.placeholders.job[locale]}
                  />
                </SelectTrigger>
                <SelectContent className={contactSelectContentClass}>
                  {jobs.map((job) => (
                    <SelectItem key={job.value} value={job.value}>
                      {job.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* COMPANY */}
            <div className="space-y-3">
              <Label
                htmlFor="company"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.company[locale]}
              </Label>
              <Input
                id="company"
                suppressHydrationWarning
                value={formData.company}
                onChange={(e) => onChange("company", e.target.value)}
                required
                placeholder={contactText.placeholders.company[locale]}
                className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-navy focus-visible:ring-0"
              />
            </div>

            {/* CITY */}
            <div className="space-y-3">
              <Label
                htmlFor="city"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.city[locale]}
              </Label>
              <Input
                id="city"
                suppressHydrationWarning
                value={formData.city}
                onChange={(e) => onChange("city", e.target.value)}
                required
                placeholder={contactText.placeholders.city[locale]}
                className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-navy focus-visible:ring-0"
              />
            </div>

            {/* COUNTRY */}
            <div className="space-y-3">
              <Label
                htmlFor="country"
                className="text-xs font-bold uppercase tracking-widest text-navy/60"
              >
                {contactText.fields.country[locale]}
              </Label>
              <Select
                value={formData.country}
                onValueChange={(val) => onChange("country", val ?? "")}
                required
              >
                <SelectTrigger
                  suppressHydrationWarning
                  className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus:ring-0"
                >
                  <SelectValue
                    placeholder={contactText.placeholders.country[locale]}
                  />
                </SelectTrigger>
                <SelectContent className={contactSelectContentClass}>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SUBJECT */}
          <div className="space-y-3">
            <Label
              htmlFor="subject"
              className="text-xs font-bold uppercase tracking-widest text-navy/60"
            >
              {contactText.fields.subject[locale]}
            </Label>
            <Input
              id="subject"
              suppressHydrationWarning
              value={formData.subject}
              onChange={(e) => onChange("subject", e.target.value)}
              required
              placeholder={contactText.placeholders.subject[locale]}
              className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-navy focus-visible:ring-0"
            />
          </div>

          {/* MESSAGE */}
          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="text-xs font-bold uppercase tracking-widest text-navy/60"
            >
              {contactText.fields.message[locale]}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => onChange("message", e.target.value)}
              required
              rows={5}
              placeholder={contactText.placeholders.message[locale]}
              className="rounded-none border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-base shadow-none focus-visible:border-navy focus-visible:ring-0 resize-none"
            />
          </div>

          {/* Area reCAPTCHA */}
          {recaptchaSiteKey && !captchaBlocked && (
            <div className="pt-4 flex sm:justify-end">
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                // PERBAIKAN TYPESCRIPT: Memaksa TypeScript menerima parameter yang dikirim oleh ReCAPTCHA
                onChange={(token: string | null) => onCaptchaChange(token)}
                onErrored={() => {
                  setCaptchaBlocked(true);
                  onCaptchaChange(null);
                }}
                hl={locale === "id" ? "id" : "en"}
              />
            </div>
          )}

          {captchaBlocked ? (
            <p className="text-xs text-amber-700 sm:text-right">
              reCAPTCHA was blocked by browser protection or an extension.
              Please allow Google scripts for this site to enable verification.
            </p>
          ) : null}

          {/* ACTION BUTTONS */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-end pt-4">
            {submitMessage ? (
              <p
                className={`w-full text-sm sm:text-right ${
                  submitStatus === "success"
                    ? "text-emerald-700"
                    : "text-red-700"
                }`}
              >
                {submitMessage}
              </p>
            ) : null}
            <Button
              type="button"
              variant="ghost"
              suppressHydrationWarning
              onClick={onReset}
              disabled={isSubmitting}
              className="rounded-none text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-transparent hover:text-navy"
            >
              {contactText.buttons.reset[locale]}
            </Button>
            <Button
              type="submit"
              suppressHydrationWarning
              disabled={isSubmitting}
              className="group flex items-center gap-4 rounded-none bg-navy px-8 py-7 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-900"
            >
              {isSubmitting
                ? locale === "id"
                  ? "Mengirim..."
                  : "Sending..."
                : contactText.buttons.submit[locale]}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
