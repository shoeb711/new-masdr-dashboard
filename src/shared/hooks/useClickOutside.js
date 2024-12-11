import { useEffect } from "react";

export const useClickOutside = (ref, func, renderFunction) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        renderFunction
      ) {
        setTimeout(() => {
          func();
        }, 0);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [func, ref, renderFunction]);
};
