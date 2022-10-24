import { useState, useEffect, useRef } from "react";

// : { toastMessage: string; toggleToast: Function }
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

export const useEventListener = <K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (
    // eslint-disable-next-line no-unused-vars
    event: Event | (HTMLElementEventMap & DocumentEventMap & WindowEventMap)[K]
  ) => void | undefined
) => {
  // Create a ref that stores handler
  const savedHandler = useRef<
    (
      // eslint-disable-next-line no-unused-vars
      event:
        | Event
        | (HTMLElementEventMap & DocumentEventMap & WindowEventMap)[K]
    ) => void | undefined
  >();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = window && window.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: Event) =>
        savedHandler.current && savedHandler.current(event);

      // Add event listener
      window.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    },
    [eventName] // Re-run if eventName or element changes
  );
};
