import { useState } from "react";

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState("");
  const toggleToast = (message: string) => setToastMessage(message);
  return {
    toastMessage,
    toggleToast,
  };
};
