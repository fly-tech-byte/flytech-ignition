export function Orbs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="orb orb-violet" style={{ width: 520, height: 520, top: -120, left: -120 }} />
      <div className="orb orb-cyan" style={{ width: 480, height: 480, top: 80, right: -140 }} />
      <div className="orb orb-violet" style={{ width: 360, height: 360, bottom: -120, left: "30%", opacity: 0.35 }} />
    </div>
  );
}
