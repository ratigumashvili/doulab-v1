"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { dateOutput } from "@/lib/helpers";

const Footer = () => {
  const footer = useTranslations("Footer");

  return (
    <footer className="mt-auto p-4 flex flex-col items-center text-center bg-gray-900 text-white">
      <p className="text-gray-200 mb-2">
        &copy; {dateOutput} {footer("copyright")}
      </p>
      <Link
        href={footer("url")}
        target="_blank"
        className="text-sm text-gray-500 mb-4"
      >
        {footer("institute")}
      </Link>
      <div className="flex items-center gap-4">
        <Link href={footer("isu")}>
          <Image
            src="/isu-logo.svg"
            width={50}
            height={50}
            alt="Ilia State University"
            className="grayscale invert hover:opacity-[0.8] transition-all"
          />
        </Link>
        <Link href="mailto:dh@iliauni.edu.ge">
          <Image
            src="/dh-isu.svg"
            height={80}
            width={80}
            alt="ISU DHLab"
            className="grayscale invert hover:opacity-[0.8] transition-all"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
