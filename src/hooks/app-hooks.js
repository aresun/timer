// # hooks
import { useReal_time } from "./real-time-hooks";

import { useEffect } from "react";
export function useApp() {
  const [hour, minute] = useReal_time();

  useEffect(() => {
    const handleResize = (e) => {
      document.documentElement.style.fontSize = `${
        0.01 * document.body.clientWidth
      }px`;
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return function clean_up() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [hour, minute];
}
