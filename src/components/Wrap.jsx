import React, { useEffect, useRef } from "react";

export function Wrap({ children, onClickOutside, show, type }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!show) return null;

  return (
    <span className={`${type}`} ref={ref}>
      {children}
    </span>
  );
}
