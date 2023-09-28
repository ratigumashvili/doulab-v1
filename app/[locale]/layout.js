import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Roboto, Noto_Serif_Georgian } from "next/font/google";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/Footer";
import Header from "./components/Header";

import ThemeProviders from "../providers/themeProviders";
import BookmarksProvider from "../providers/bookmarksProvider";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
});
const noto = Noto_Serif_Georgian({
  subsets: ["georgian", "latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const locales = ["ka", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={locale === "ka" ? noto.className : roboto.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProviders>
            <BookmarksProvider>
              <Header />
              <main className="max-w-7xl w-full mx-auto my-[2rem] md:my-[4.5rem] px-6 xl:px-2">
                {children}
              </main>
              <Footer />
            </BookmarksProvider>
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
