import GitHubRepoCard from "./GitHubRepoCard";
import { formatDate } from "#/utils/formatDate";
import { GitFork, Star } from "lucide-react";

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  HTML: "#e34c26", CSS: "#563d7c", Go: "#00ADD8",
};

/* Pinned 2-col grid for Overview tab */
export const PinnedRepos = ({ repos }) => (
  <div className="flex flex-col gap-3">
    <p className="text-sm font-semibold" style={{ color: "#e6edf3" }}>Pinned</p>
    <div className="grid grid-cols-2 gap-3">
      {repos.slice(0, 6).map((r) => (
        <GitHubRepoCard key={r.id} repo={r} />
      ))}
    </div>
  </div>
);

/* Row-style list for Repositories tab */
export const RepoRow = ({ repo }) => (
  <div
    className="flex flex-col gap-1 py-4"
    style={{ borderBottom: "1px solid #21262d" }}
  >
    <div className="flex items-center gap-2">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
         className="text-base font-semibold hover:underline" style={{ color: "#58a6ff" }}>
        {repo.name}
      </a>
      <span className="text-xs px-2 py-0.5 rounded-full" style={{ border: "1px solid #30363d", color: "#8b949e" }}>
        {repo.visibility || "Public"}
      </span>
    </div>
    {repo.description && (
      <p className="text-sm" style={{ color: "#8b949e" }}>{repo.description}</p>
    )}
    <div className="flex items-center gap-4 text-xs mt-1" style={{ color: "#8b949e" }}>
      {repo.language && (
        <span className="flex items-center gap-1">
          <span className="size-3 rounded-full inline-block" style={{ background: LANG_COLORS[repo.language] ?? "#8b949e" }} />
          {repo.language}
        </span>
      )}
      {repo.stargazers_count > 0 && (
        <span className="flex items-center gap-1"><Star size={12} />{repo.stargazers_count}</span>
      )}
      {repo.forks_count > 0 && (
        <span className="flex items-center gap-1"><GitFork size={12} />{repo.forks_count}</span>
      )}
      <span>Updated {formatDate(repo.updated_at)}</span>
    </div>
  </div>
);

const GitHubRepoList = ({ repos, mode = "pinned" }) =>
  mode === "pinned" ? (
    <PinnedRepos repos={repos} />
  ) : (
    <div>{repos.map((r) => <RepoRow key={r.id} repo={r} />)}</div>
  );

export default GitHubRepoList;
