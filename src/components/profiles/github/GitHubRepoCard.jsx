import { Star, GitFork } from "lucide-react";
import { formatDate } from "#/utils/formatDate";

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  HTML: "#e34c26", CSS: "#563d7c", Go: "#00ADD8", Rust: "#dea584",
  Java: "#b07219", "C++": "#f34b7d", Ruby: "#701516", Shell: "#89e051",
};

const GitHubRepoCard = ({ repo, full = false }) => (
  <div
    className="flex flex-col gap-1.5 p-4 rounded-md h-full"
    style={{ border: "1px solid #30363d", background: "#161b22" }}
  >
    {/* Header */}
    <div className="flex items-center gap-1.5 flex-wrap">
      <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, fill: "#8b949e", flexShrink: 0 }} aria-hidden="true">
        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
      </svg>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline font-semibold text-sm"
        style={{ color: "#58a6ff" }}
      >
        {repo.name}
      </a>
      <span
        className="ml-auto text-xs px-2 py-0.5 rounded-full"
        style={{ border: "1px solid #30363d", color: "#8b949e" }}
      >
        {repo.fork ? "Fork" : repo.visibility || "Public"}
      </span>
    </div>

    {/* Description */}
    {repo.description && (
      <p className="text-xs leading-relaxed flex-1" style={{ color: "#8b949e" }}>
        {repo.description}
      </p>
    )}

    {/* Topics */}
    {repo.topics?.length > 0 && (
      <div className="flex flex-wrap gap-1">
        {repo.topics.slice(0, 3).map((t) => (
          <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ background: "#1f3a5f", color: "#58a6ff" }}>
            {t}
          </span>
        ))}
      </div>
    )}

    {/* Footer */}
    <div className="flex items-center gap-3 pt-1 text-xs" style={{ color: "#8b949e" }}>
      {repo.language && (
        <span className="flex items-center gap-1">
          <span className="size-3 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? "#8b949e", display: "inline-block" }} />
          {repo.language}
        </span>
      )}
      {repo.stargazers_count > 0 && (
        <a href={`${repo.html_url}/stargazers`} target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors">
          <Star size={12} />{repo.stargazers_count}
        </a>
      )}
      {repo.forks_count > 0 && (
        <a href={`${repo.html_url}/network/members`} target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors">
          <GitFork size={12} />{repo.forks_count}
        </a>
      )}
      {full && <span className="ml-auto">Updated {formatDate(repo.updated_at)}</span>}
    </div>
  </div>
);

export default GitHubRepoCard;
