export default function SoundToggle({ on, onToggle }) {
  return (
    <button className="sound-toggle" onClick={onToggle} aria-label="Toggle sound">
      {on ? "🔊" : "🔇"}
    </button>
  );
}
