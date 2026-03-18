import Image from "next/image";
import { motion } from "framer-motion";
import {
  contactInfo,
  contactText,
  itemVariants,
} from "@/components/contact/contact-content";
import type { ContactLocale } from "@/components/contact/types";

type ContactInfoSectionProps = {
  locale: ContactLocale;
  isIOS: boolean;
};

export default function ContactInfoSection({
  locale,
  isIOS,
}: ContactInfoSectionProps) {
  return (
    <div className="lg:col-span-5 flex flex-col justify-between">
      <motion.div variants={itemVariants}>
        <div className="mb-6 flex items-center gap-4">
          <div className="h-[2px] w-12 bg-navy" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-navy/70">
            {contactText.eyebrow[locale]}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-navy leading-[1.05] mb-6">
          {contactText.titleLine1[locale]}
          <br />
          {contactText.titleLine2[locale]}
        </h1>
        <p className="text-base text-gray-600 leading-relaxed font-medium max-w-md mb-12">
          {contactText.description[locale]}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col gap-8 mb-12">
        {contactInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={`${item.type}-${item.value}`}
              className="flex items-center gap-5 group cursor-default"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-navy/20 bg-transparent text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-1">
                  {item.label[locale]}
                </p>
                <p className="text-lg font-semibold text-navy">{item.value}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative h-64 w-full overflow-hidden shadow-2xl"
      >
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
          alt={contactText.imageAlt[locale]}
          fill
          quality={isIOS ? 20 : 75}
          className="object-cover grayscale contrast-125 opacity-80 transition-transform duration-1000 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 40vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h4 className="text-xl font-bold text-white uppercase tracking-wider">
            {contactText.imageCaptionTitle[locale]}
          </h4>
          <p className="text-xs text-white/70 uppercase tracking-widest mt-1">
            {contactText.imageCaptionSubtitle[locale]}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
