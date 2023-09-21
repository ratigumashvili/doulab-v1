"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

const Cemeteries = () => {
  const general = useTranslations("General");
  const router = useRouter();

  useEffect(() => {
    router.push("/data");
  }, []);
  return <h2>{general("redirecting")}</h2>;
};

export default Cemeteries;
