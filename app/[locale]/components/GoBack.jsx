import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { ArrowLeft } from "lucide-react";

const GoBack = () => {
  const router = useRouter();
  const general = useTranslations("General");
  return (
    <button
      onClick={() => router.back()}
      className="pb-1"
      title={general("back")}
    >
      <ArrowLeft size={28} />
    </button>
  );
};

export default GoBack;
