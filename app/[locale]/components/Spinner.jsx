import { useTranslations } from "next-intl";

const Spinner = () => {
  const message = useTranslations("Messages");
  return (
    <div
      className="block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        {message("loading")}
      </span>
    </div>
  );
};

export default Spinner;
