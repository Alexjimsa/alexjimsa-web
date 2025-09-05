import { useEffect, useRef, useState } from "react";

type Props = {
  items: readonly string[];
  interval?: number; // ms (por defecto 2200)
};

export default function RotatingText({ items, interval = 2200 }: Props) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (items.length <= 1) return; // nada que rotar
    const id = setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items, interval]);

  // Actualiza el contenido para lectores de pantalla
  useEffect(() => {
    if (ref.current) ref.current.textContent = items[i] ?? "";
  }, [i, items]);

  return (
    <span
      ref={ref}
      aria-live="polite"
      aria-atomic="true"
    >
      {items[0] ?? ""}
    </span>
  );
}
