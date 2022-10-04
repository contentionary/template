import { useState } from "react";

// : { toastMessage: string; toggleToast: Function }
export const useToast: any = () => {
  const [toastMessage, setToastMessage] = useState("");
  const toggleToast = (message: string) => setToastMessage(message);
  return {
    toastMessage,
    toggleToast,
  };
};
