import { useEffect, useState } from "react";

type Props = {
  items: readonly string[];
  interval?: number;
};

export default function RotatingText({ items, interval = 2200 }: Props) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setFade(false);                   // fade-out
      setTimeout(() => {
        setI((n) => (n + 1) % items.length);
        setFade(true);                  // fade-in
      }, 300);                          // debe coincidir con la duración
    }, interval);
    return () => clearInterval(id);
  }, [items, interval]);

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: "inline-block",
        opacity: fade ? 1 : 0,
        transition: "opacity 300ms ease",
      }}
    >
      {items[i]}
    </span>
  );
}
