import { useEffect, useState } from "react";
import useSafariStore from "#/store/safari/safariStore";
import { profileConfig } from "#/data/profiles/profileConfig";

const GH_TEXT   = "#e6edf3";
const GH_MUTED  = "#8b949e";
const GH_BORDER = "#30363d";
const GH_CARD   = "#161b22";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

/* ── Process raw GitHub events into monthly groups ── */
const processEvents = (events) => {
  const map = {};
  for (const e of events) {
    if (!["PushEvent","CreateEvent"].includes(e.type)) continue;
    const d = new Date(e.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map[key]) map[key] = { year: d.getFullYear(), month: d.getMonth(), pushEvents: [], createEvents: [] };
    if (e.type === "PushEvent") map[key].pushEvents.push(e);
    if (e.type === "CreateEvent") map[key].createEvents.push(e);
  }

  return Object.entries(map)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([, data]) => {
      const repoMap = {};
      for (const e of data.pushEvents) {
        const name = e.repo.name;
        repoMap[name] = (repoMap[name] || 0) + (e.payload.size || 0);
      }
      const commitRepos = Object.entries(repoMap)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));
      const totalCommits = commitRepos.reduce((s, r) => s + r.count, 0);

      const createdRepos = data.createEvents
        .filter((e) => e.payload.ref_type === "repository")
        .map((e) => ({ name: e.repo.name, date: e.created_at }));

      return { year: data.year, month: data.month, commitRepos, totalCommits, createdRepos };
    })
    .filter((m) => m.totalCommits > 0 || m.createdRepos.length > 0);
};

const fmtDate = (iso) => {
  const d = new Date(iso);
  return `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
};

/* ── SVG Icons ── */
const CommitSVG = () => (
  <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, fill: GH_MUTED }}>
    <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
  </svg>
);

const RepoSVG = () => (
  <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, fill: GH_MUTED }}>
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
  </svg>
);

const DotsSVG = () => (
  <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: GH_MUTED }}>
    <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </svg>
);

const IconCircle = ({ children }) => (
  <div style={{
    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
    background: "#21262d", border: `1px solid ${GH_BORDER}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", zIndex: 1,
  }}>
    {children}
  </div>
);

const MoreBtn = () => (
  <button style={{
    background: "#30363d", border: "none", borderRadius: 4,
    padding: "3px 7px", cursor: "pointer", display: "flex", alignItems: "center",
  }}>
    <DotsSVG />
  </button>
);

/* ── Month group component ── */
const MonthGroup = ({ group }) => {
  const [expanded, setExpanded] = useState(true);
  const maxCount = group.commitRepos[0]?.count || 1;
  const MAX_BAR = 150;

  const events = [
    ...(group.totalCommits > 0 ? [{ type: "commits" }] : []),
    ...group.createdRepos.map((r) => ({ type: "repo", repo: r })),
  ];

  return (
    <div style={{ position: "relative", paddingBottom: 8 }}>
      {/* Continuous vertical line */}
      <div style={{
        position: "absolute",
        left: 12,
        top: 26,
        bottom: 0,
        width: 2,
        background: GH_BORDER,
        zIndex: 0,
      }} />

      {events.map((ev, ei) => (
        <div key={ei} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {/* Icon */}
          <IconCircle>
            {ev.type === "commits" ? <CommitSVG /> : <RepoSVG />}
          </IconCircle>

          {/* Card */}
          <div style={{
            flex: 1, border: `1px solid ${GH_BORDER}`,
            borderRadius: 6, background: GH_CARD, overflow: "hidden",
          }}>
            {/* Card header */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "9px 12px",
            }}>
              {ev.type === "commits" ? (
                <span
                  style={{ color: GH_TEXT, fontSize: 13, cursor: "pointer" }}
                  onClick={() => setExpanded((v) => !v)}
                >
                  Created{" "}
                  <strong>{group.totalCommits}</strong>{" "}
                  commit{group.totalCommits !== 1 ? "s" : ""} in{" "}
                  <strong>{group.commitRepos.length}</strong>{" "}
                  repositor{group.commitRepos.length !== 1 ? "ies" : "y"}
                </span>
              ) : (
                <span style={{ color: GH_TEXT, fontSize: 13 }}>
                  Created <strong>1</strong> repository
                </span>
              )}
              <MoreBtn />
            </div>

            {/* Commit repo rows */}
            {ev.type === "commits" && expanded && (
              <div style={{ borderTop: `1px solid ${GH_BORDER}` }}>
                {group.commitRepos.slice(0, 6).map((r, ri) => (
                  <div
                    key={ri}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "6px 12px",
                      borderBottom: ri < Math.min(group.commitRepos.length, 6) - 1
                        ? `1px solid ${GH_BORDER}` : "none",
                    }}
                  >
                    <a
                      href={`https://github.com/${r.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#58a6ff", fontSize: 12, textDecoration: "none", flexShrink: 0 }}
                      onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                    >
                      {r.name}
                    </a>
                    <span style={{ color: GH_MUTED, fontSize: 11, flexShrink: 0 }}>
                      {r.count} commit{r.count !== 1 ? "s" : ""}
                    </span>
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                      <div style={{
                        height: 8, borderRadius: 4, background: "#39d353",
                        width: `${Math.max(4, Math.round((r.count / maxCount) * MAX_BAR))}px`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Created repo row */}
            {ev.type === "repo" && (
              <div style={{
                borderTop: `1px solid ${GH_BORDER}`,
                padding: "6px 12px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <svg viewBox="0 0 16 16" style={{ width: 13, height: 13, fill: GH_MUTED }}>
                    <path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 1 0-5 0v2Z" />
                  </svg>
                  <a
                    href={`https://github.com/${ev.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#58a6ff", fontSize: 12, textDecoration: "none" }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                  >
                    {ev.repo.name}
                  </a>
                </div>
                <span style={{ color: GH_MUTED, fontSize: 11 }}>{fmtDate(ev.repo.date)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Main component ── */
const GitHubActivity = () => {
  const { githubEvents, fetchEvents } = useSafariStore();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchEvents(profileConfig.githubUsername);
  }, []); // eslint-disable-line

  const groups = processEvents(githubEvents);
  const visible = showAll ? groups : groups.slice(0, 3);

  return (
    <div>
      <h2 style={{ color: GH_TEXT, fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
        Contribution activity
      </h2>

      {groups.length === 0 ? (
        <div style={{ color: GH_MUTED, fontSize: 13 }}>No recent activity found.</div>
      ) : (
        <>
          {visible.map((group, gi) => (
            <div key={`${group.year}-${group.month}`} style={{ marginBottom: 24 }}>
              {/* Month header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ color: GH_TEXT, fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>
                  {MONTH_NAMES[group.month]}{" "}
                  <span style={{ color: "#58a6ff" }}>{group.year}</span>
                </span>
                <div style={{ flex: 1, height: 1, background: GH_BORDER }} />
              </div>

              <MonthGroup group={group} />
            </div>
          ))}

          {/* Show more / less button */}
          {groups.length > 3 && (
            <button
              onClick={() => setShowAll((v) => !v)}
              style={{
                width: "100%", padding: "12px",
                borderRadius: 6, border: `1px solid ${GH_BORDER}`,
                background: "transparent", color: "#58a6ff",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#21262d"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              {showAll ? "Show less activity" : "Show more activity"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default GitHubActivity;
