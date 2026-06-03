const GlowCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

export default GlowCard;
