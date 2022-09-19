import { useState } from "react";
interface Props {
  isOpen: boolean;
  openDialog: Function;
  closeDialog: Function;
}
export const useDialog = (): Props => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return { isOpen, openDialog, closeDialog };
};
