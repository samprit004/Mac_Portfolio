import { useEffect } from "react";
import useSafariStore from "#/store/safari/safariStore";
import { profileConfig } from "#/data/profiles/profileConfig";
import GitHubNavBar from "./GitHubNavBar";
import GitHubHero from "./GitHubHero";
import GitHubLoading from "./GitHubLoading";
import GitHubError from "./GitHubError";
import GitHubContributions from "./GitHubContributions";
import GitHubActivity from "./GitHubActivity";
import { RepoRow } from "./GitHubRepoList";

const GH_BG     = "#0d1117";
const GH_TEXT   = "#e6edf3";
const GH_MUTED  = "#8b949e";
const GH_BORDER = "#30363d";

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  HTML: "#e34c26", CSS: "#563d7c", Go: "#00ADD8", Rust: "#dea584",
  Java: "#b07219", "C++": "#f34b7d", Ruby: "#701516", Shell: "#89e051",
};

/* ── Popular repo card ── */
const RepoCard = ({ repo }) => (
  <div style={{
    display: "flex", flexDirection: "column", gap: 6,
    padding: 16, borderRadius: 6,
    border: `1px solid ${GH_BORDER}`, background: "#161b22",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, fill: GH_MUTED, flexShrink: 0 }}>
        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
      </svg>
      <a
        href={repo.html_url} target="_blank" rel="noopener noreferrer"
        style={{ color: "#58a6ff", fontWeight: 600, fontSize: 13, textDecoration: "none" }}
        onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
      >
        {repo.name}
      </a>
      <span style={{
        marginLeft: "auto", fontSize: 11, padding: "1px 7px",
        borderRadius: 20, border: `1px solid ${GH_BORDER}`, color: GH_MUTED,
      }}>
        {repo.visibility || "Public"}
      </span>
    </div>
    {repo.description && (
      <p style={{ fontSize: 12, color: GH_MUTED, lineHeight: 1.5, margin: 0 }}>{repo.description}</p>
    )}
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: GH_MUTED, marginTop: "auto", paddingTop: 4 }}>
      {repo.language && (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{
            width: 10, height: 10, borderRadius: "50%", display: "inline-block",
            background: LANG_COLORS[repo.language] ?? GH_MUTED,
          }} />
          {repo.language}
        </span>
      )}
      {repo.stargazers_count > 0 && (
        <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: GH_MUTED }}>
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
          {repo.stargazers_count}
        </span>
      )}
    </div>
  </div>
);

/* ── Profile tab button ── */
const ProfileTab = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "8px 12px", fontSize: 14,
      fontWeight: active ? 600 : 400,
      color: active ? GH_TEXT : GH_MUTED,
      background: "transparent", border: "none",
      borderBottom: active ? "2px solid #f78166" : "2px solid transparent",
      cursor: "pointer", whiteSpace: "nowrap",
    }}
    onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = GH_TEXT; }}
    onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = GH_MUTED; }}
  >
    {label}
    {count != null && (
      <span style={{
        padding: "1px 6px", fontSize: 11, fontWeight: 500,
        borderRadius: 20,
        background: active ? "#30363d" : "#21262d",
        color: active ? GH_TEXT : GH_MUTED,
      }}>
        {count}
      </span>
    )}
  </button>
);

/* ── Repositories tab filter bar ── */
const RepoFilterBar = ({ repos }) => (
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
      <input
        placeholder="Find a repository…"
        style={{
          flex: 1, minWidth: 160, padding: "5px 12px",
          borderRadius: 6, border: `1px solid ${GH_BORDER}`,
          background: "#0d1117", color: GH_TEXT, fontSize: 13, outline: "none",
        }}
      />
      {["Type","Language","Sort"].map((lbl) => (
        <button key={lbl} style={{
          padding: "5px 12px", borderRadius: 6,
          border: `1px solid ${GH_BORDER}`, background: "#21262d",
          color: GH_TEXT, fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          {lbl}
          <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: GH_MUTED }}>
            <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427z" />
          </svg>
        </button>
      ))}
      <a
        href={`${profileConfig.githubUrl}/new`} target="_blank" rel="noopener noreferrer"
        style={{
          padding: "5px 12px", borderRadius: 6, border: "none",
          background: "#238636", color: "#fff", fontSize: 13,
          fontWeight: 500, cursor: "pointer", textDecoration: "none",
        }}
      >
        New
      </a>
    </div>
    {repos.length === 0
      ? <p style={{ color: GH_MUTED, fontSize: 13, padding: "16px 0" }}>Loading repositories…</p>
      : repos.map((r) => <RepoRow key={r.id} repo={r} />)
    }
  </div>
);

/* ── Main profile component ── */
const GitHubProfile = () => {
  const {
    githubData, githubRepos, githubAllRepos,
    githubProfileTab, loading, error,
    fetchGitHubProfile, fetchAllRepos, setGitHubProfileTab,
  } = useSafariStore();

  useEffect(() => {
    fetchGitHubProfile(profileConfig.githubUsername);
  }, []); // eslint-disable-line

  const handleTab = (tab) => {
    setGitHubProfileTab(tab);
    if (tab === "repositories") fetchAllRepos(profileConfig.githubUsername);
  };

  if (loading) return <GitHubLoading />;
  if (error)   return <GitHubError message={error} />;
  if (!githubData) return null;

  const tabs = [
    { id: "overview",     label: "Overview",     count: null },
    { id: "repositories", label: "Repositories", count: githubData.public_repos },
  ];

  return (
    <div style={{
      display: "flex", flexDirection: "column", minHeight: "100%",
      background: GH_BG, color: GH_TEXT,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* GitHub nav */}
      <GitHubNavBar avatarUrl={githubData.avatar_url} />

      {/* Tab bar */}
      <div style={{ borderBottom: `1px solid ${GH_BORDER}`, padding: "0 16px" }}>
        <div style={{ display: "flex" }}>
          {tabs.map((t) => (
            <ProfileTab
              key={t.id}
              label={t.label}
              count={t.count}
              active={githubProfileTab === t.id}
              onClick={() => handleTab(t.id)}
            />
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", gap: 24, padding: "24px 16px", flex: 1 }}>
        {/* Left sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <GitHubHero data={githubData} />
        </div>

        {/* Right content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {githubProfileTab === "overview" && (
            <>
              {/* 1. Popular repositories */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: GH_TEXT, marginBottom: 12 }}>
                  Popular repositories
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {githubRepos.slice(0, 6).map((r) => (
                    <RepoCard key={r.id} repo={r} />
                  ))}
                </div>
              </div>

              {/* 2. Contribution heatmap + year toggle */}
              <GitHubContributions />

              {/* 3. Contribution activity */}
              <GitHubActivity />
            </>
          )}

          {githubProfileTab === "repositories" && (
            <RepoFilterBar repos={githubAllRepos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;
