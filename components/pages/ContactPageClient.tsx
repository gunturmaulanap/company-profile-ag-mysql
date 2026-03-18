"use client";

import { useState } from "react";
import MenuOverlayPage from "@/components/MenuOverlay";
import Footer from "@/components/Footer";
import FindUs from "../FindUs";
import { useLocale } from "@/lib/i18n";
import ContactMainSection from "@/components/contact/ContactMainSection";
import type { ContactLocale, FormData } from "@/components/contact/types";

export default function ContactPageClient() {
  const { locale } = useLocale();
  const activeLocale: ContactLocale = locale === "id" ? "id" : "en";
  const isIOS =
    typeof window !== "undefined" &&
    (window.innerWidth < 1024 ||
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    email: "",
    phone: "",
    job: "",
    company: "",
    city: "",
    country: "",
    subject: "",
    message: "",
  });

  // PERBAIKAN: Tambahkan state khusus untuk token Captcha yang menerima string atau null
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // PERBAIKAN: Fungsi handler untuk menangkap perubahan status Captcha
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      email: "",
      phone: "",
      job: "",
      company: "",
      city: "",
      country: "",
      subject: "",
      message: "",
    });
    setCaptchaToken(null);
    setSubmitMessage(null);
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setSubmitStatus(null);

    // PERBAIKAN: Cegah submit jika captcha belum dicentang
    if (!captchaToken) {
      setSubmitStatus("error");
      setSubmitMessage(
        activeLocale === "id"
          ? "Mohon centang kotak reCAPTCHA terlebih dahulu."
          : "Please check the reCAPTCHA box first.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          locale: activeLocale,
          captchaToken, // <-- Kirim token ke backend untuk divalidasi
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          payload.message ||
            (activeLocale === "id"
              ? "Terjadi kesalahan saat mengirim pesan."
              : "Failed to send message."),
        );
      }

      setSubmitStatus("success");
      setSubmitMessage(
        payload.message ||
          (activeLocale === "id"
            ? "Pesan berhasil dikirim."
            : "Message sent successfully."),
      );

      setFormData({
        name: "",
        category: "",
        email: "",
        phone: "",
        job: "",
        company: "",
        city: "",
        country: "",
        subject: "",
        message: "",
      });
      setCaptchaToken(null);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : activeLocale === "id"
            ? "Gagal mengirim pesan. Silakan coba lagi."
            : "Failed to send message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen text-navy selection:bg-navy selection:text-white">
      <MenuOverlayPage />
      <ContactMainSection
        locale={activeLocale}
        isIOS={isIOS}
        formData={formData}
        onChange={handleInputChange}
        onCaptchaChange={handleCaptchaChange} // <-- Teruskan props ke bawah
        onReset={handleReset}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        submitStatus={submitStatus}
      />

      <FindUs locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
