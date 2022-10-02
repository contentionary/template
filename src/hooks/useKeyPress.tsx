import { useEffect, useState } from "react";

function useKeyPress(targetKey: string, action: Function) {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  function downHandler({ key }: { key: string }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => alert(key));
    return () => {
      window.removeEventListener("keydown", ({ key }) => alert(key));
    };
  }, []);
  return keyPressed;
}

export default useKeyPress;
