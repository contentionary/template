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

export function useTimer(
  setTimeOut: React.Dispatch<React.SetStateAction<boolean>>
) {
  const countUpRef = useRef<NodeJS.Timer | number>();
  const countDownRef = useRef<NodeJS.Timer | number>();
  const [timer, setTimer] = useState<number>();
  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const start = (initDuration: number) => {
    if (isNaN(initDuration) || initDuration <= 0) setTimeOut(true);
    const timeToMilliseconds = Date.now() + 1000 * 60 * Number(initDuration);
    setDuration(timeToMilliseconds);
    setTimer(timeToMilliseconds - Date.now());
    countDownRef.current = countDown();
  };
  function countDown() {
    return setInterval(() => {
      setTimer((timer: any) => {
        if (timer === 0 || timer < 0) {
          setTimeOut(true);
          clearInterval(countDownRef.current);
        } else if (timer && timer > 0) {
          return timer - 1000;
        } else {
          return;
        }
      });
    }, 1000);
  }
  function countUp() {
    return setInterval(() => {
      setDuration((duration) => duration + 1000);
    }, 1000);
  }
  const pause = () => {
    clearInterval(countDownRef.current);
    countUpRef.current = countUp();
    setIsPaused(false);
  };
  const resume = () => {
    clearInterval(countUpRef.current);
    setTimer(duration - Date.now());
    countDownRef.current = countDown();
    setIsPaused(true);
  };
  const formatTime = (distance: number) => {
    const days =
      "0" + Math.floor(distance / (1000 * 60 * 60 * 24)) + "".slice(-2);
    const hours = `0${Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )}`.slice(-2);
    const minutes = `0${Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    )}`.slice(-2);
    const seconds = `0${Math.floor((distance % (1000 * 60)) / 1000)}`.slice(-2);
    return {
      seconds,
      minutes,
      hours,
      days,
    };
  };
  const cb = (fn: Function) => {
    fn();
  };
  return {
    pause,
    start,
    resume,
    timer,
    formatTime,
    isPaused,
    cb,
  };
}
