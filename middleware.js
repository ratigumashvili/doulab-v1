import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["ka", "en"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  // !! comented defaultLocale for getting active class in LanguageSwitcher
  // defaultLocale: "ka",
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
