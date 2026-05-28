import { ExternalLink } from "lucide-react";

const ExternalLinkButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200"
  >
    {children}
    <ExternalLink size={14} />
  </a>
);

export default ExternalLinkButton;
