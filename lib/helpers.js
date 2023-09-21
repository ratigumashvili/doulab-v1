import { toast } from "react-toastify";

const dateDeveloped = 2023;
const currentDate = new Date().getFullYear();

export const dateOutput =
  currentDate > dateDeveloped
    ? dateDeveloped + " - " + currentDate + "; "
    : dateDeveloped;

export const message_options = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
};

export const preventMinus = (e) => {
  if (e.code === "Minus") {
    e.preventDefault();
  }
};

export const separate = (array, index) => {
  return index + 1 === array.length ? "" : ", ";
};

export const locationHref = () => {
  if (typeof window !== "undefined") {
    return window.location.href.toString();
  }
};

export const openMailClient = (subject) => {
  if (typeof window === "undefined") return;

  window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(
    locationHref()
  )}`;
};

export const handleCopyUrl = async (message) => {
  await navigator.clipboard.writeText(locationHref());
  toast.success(message, { message_options });
};
