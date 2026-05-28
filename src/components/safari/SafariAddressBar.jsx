import { ChevronLeft, ChevronRight, RotateCcw, Share2, Plus } from "lucide-react";

const SafariAddressBar = ({ url }) => (
  <div className="flex items-center gap-1 flex-1 px-3">
    {/* Back / Forward */}
    <button className="p-1 rounded hover:bg-black/8 text-gray-400 cursor-pointer disabled:opacity-30" title="Back">
      <ChevronLeft size={18} strokeWidth={2.5} />
    </button>
    <button className="p-1 rounded hover:bg-black/8 text-gray-400 cursor-pointer disabled:opacity-30" title="Forward">
      <ChevronRight size={18} strokeWidth={2.5} />
    </button>

    {/* URL bar */}
    <div
      className="flex items-center gap-2 flex-1 mx-2 px-3 py-1 rounded-lg cursor-text"
      style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)" }}
    >
      {/* Lock icon */}
      <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: "#3c9142", flexShrink: 0 }} aria-hidden="true">
        <path d="M11.5 1a3.5 3.5 0 0 1 3.5 3.5V8h-1V4.5a2.5 2.5 0 0 0-5 0V8H8V4.5A3.5 3.5 0 0 1 11.5 1zm-7 0A3.5 3.5 0 0 1 8 4.5V8H7V4.5a2.5 2.5 0 0 0-5 0V8H1V4.5A3.5 3.5 0 0 1 4.5 1z" />
        <rect x="2" y="7" width="12" height="8" rx="1.5" style={{ fill: "#3c9142" }} />
      </svg>
      <span className="text-xs text-gray-600 truncate flex-1 text-center leading-none">
        {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </span>
      <RotateCcw size={11} className="text-gray-400 shrink-0" />
    </div>

    {/* Actions */}
    <button className="p-1 rounded hover:bg-black/8 text-gray-500 cursor-pointer" title="Share">
      <Share2 size={16} />
    </button>
    <button className="p-1 rounded hover:bg-black/8 text-gray-500 cursor-pointer" title="New Tab">
      <Plus size={16} />
    </button>
  </div>
);

export default SafariAddressBar;
