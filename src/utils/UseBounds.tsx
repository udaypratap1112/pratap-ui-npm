import { useEffect, useRef, useState } from "react";
function debounce<T extends Function>(func: T, time = 1000) {
  let timeout: any;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, time);
  };
}

export const useBounds = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [bounds, setBounds] = useState<any>({});

  useEffect(() => {
    if (ref.current) {
      const d = ref.current.getBoundingClientRect();
      setBounds(d);
    }

    const debouncedResize = debounce(() => {
      if (ref.current) {
        const d = ref.current.getBoundingClientRect();
        setBounds(d);
      }
    });

    window.addEventListener("resize", debouncedResize);
      return () => { window.removeEventListener("resize", debouncedResize); };
      
  }, [ref]);

  return [ref, bounds];
};
