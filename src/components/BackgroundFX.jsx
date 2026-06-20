import { useMemo } from "react";

export default function BackgroundFX() {
  const confetti = useMemo(() => {
    const cols = ["#FFD166", "#FF1B6B", "#22D3EE", "#9BE15D", "#A78BFA", "#FF8A00"];
    return Array.from({ length: 22 }, (_, i) => ({
      left: Math.random() * 100,
      delay: -Math.random() * 8,
      dur: 7 + Math.random() * 7,
      size: 5 + Math.random() * 6,
      color: cols[i % cols.length],
      drift: (Math.random() * 2 - 1) * 26,
      rot: Math.random() * 360,
    }));
  }, []);
  return (
    <div className="bgfx" aria-hidden="true">
      <div className="ray ray1" />
      <div className="ray ray2" />
      {confetti.map((c, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: c.left + "%",
            width: c.size,
            height: c.size * 1.6,
            background: c.color,
            animationDuration: c.dur + "s",
            animationDelay: c.delay + "s",
            "--drift": c.drift + "px",
            "--rot": c.rot + "deg",
          }}
        />
      ))}
    </div>
  );
}
