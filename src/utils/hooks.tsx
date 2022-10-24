import { useState } from "react";
export const useToast: any = () => {
  const [toastMessage, setToastMessage] = useState("");
  const toggleToast = (message: string) => setToastMessage(message);
  return {
    toastMessage,
    toggleToast,
  };
};
export const useMenu: any = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuIsOpen = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  return {
    anchorEl,
    openMenu,
    menuIsOpen,
    closeMenu,
  };
};
