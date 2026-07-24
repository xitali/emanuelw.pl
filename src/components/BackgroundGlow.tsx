"use client";

export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Cyan orb top left */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] bg-glow-orb" />
      
      {/* Purple orb top right */}
      <div className="absolute top-1/4 -right-40 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[140px] bg-glow-orb" style={{ animationDelay: '2s' }} />

      {/* Blue orb center */}
      <div className="absolute top-2/3 left-1/3 w-[35rem] h-[35rem] bg-blue-600/15 rounded-full blur-[160px] bg-glow-orb" style={{ animationDelay: '4s' }} />
      
      {/* Grid overlay pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
