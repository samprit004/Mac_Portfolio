import { useEffect } from "react";
import useSafariStore from "#/store/safari/safariStore";
import { profileConfig } from "#/data/profiles/profileConfig";

const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

const buildGrid = (contributions) => {
  if (!contributions?.length) return { weeks: [], monthLabels: [] };

  const weeks = [];
  let week = [];
  const firstDate = new Date(contributions[0].date + "T00:00:00");
  for (let i = 0; i < firstDate.getDay(); i++) week.push(null);
  for (const day of contributions) {
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const monthLabels = [];
  let prevMonth = -1;
  weeks.forEach((w, wi) => {
    const first = w.find(Boolean);
    if (first) {
      const m = new Date(first.date + "T00:00:00").getMonth();
      if (m !== prevMonth) { monthLabels.push({ wi, label: MONTHS[m] }); prevMonth = m; }
    }
  });

  return { weeks, monthLabels };
};

const GitHubContributions = () => {
  const {
    githubContributionsByYear,
    selectedContributionYear,
    fetchContributionsForYear,
    setSelectedContributionYear,
  } = useSafariStore();

  useEffect(() => {
    fetchContributionsForYear(profileConfig.githubUsername, selectedContributionYear);
  }, [selectedContributionYear]); // eslint-disable-line

  const handleYear = (year) => {
    setSelectedContributionYear(year);
    fetchContributionsForYear(profileConfig.githubUsername, year);
  };

  const yearData = githubContributionsByYear[String(selectedContributionYear)];
  const contributions = yearData?.contributions ?? [];
  const total = yearData?.total ?? {};
  const totalCount = Object.values(total).reduce((a, b) => a + b, 0);
  const { weeks, monthLabels } = buildGrid(contributions);

  return (
    <div style={{ marginBottom: 32 }}>
      <style>{`
        .gh-contrib-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .gh-contrib-scroll::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        .gh-contrib-scroll::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 3px;
        }
        .gh-contrib-scroll::-webkit-scrollbar-thumb:hover {
          background: #484f58;
        }
        .gh-contrib-scroll {
          scrollbar-width: thin;
          scrollbar-color: #30363d transparent;
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ color: "#e6edf3", fontSize: 14, fontWeight: 600 }}>
          {totalCount.toLocaleString()} contributions in {selectedContributionYear}
        </span>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 12, color: "#8b949e",
            background: "transparent", border: "none", cursor: "pointer",
            padding: "4px 8px", borderRadius: 6,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#21262d"; e.currentTarget.style.color = "#e6edf3"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b949e"; }}
        >
          Contribution settings
          <svg viewBox="0 0 16 16" style={{ width: 12, height: 12, fill: "currentColor" }}>
            <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427z" />
          </svg>
        </button>
      </div>

      {/* Heatmap box + year pills row */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Heatmap box */}
        <div
          className="gh-contrib-scroll"
          style={{
            flex: 1, minWidth: 0,
            border: "1px solid #30363d",
            borderRadius: 6,
            padding: "12px 16px 10px",
            background: "#161b22",
            overflowX: "auto",
          }}
        >
          {!yearData ? (
            <div style={{ color: "#8b949e", fontSize: 13, padding: "20px 0", textAlign: "center" }}>
              Loading…
            </div>
          ) : weeks.length === 0 ? (
            <div style={{ color: "#8b949e", fontSize: 13, padding: "20px 0", textAlign: "center" }}>
              No contributions found for {selectedContributionYear}.
            </div>
          ) : (
            <>
              {/* Month label row */}
              <div style={{ display: "flex", marginLeft: 30, marginBottom: 4 }}>
                {weeks.map((_, wi) => {
                  const hit = monthLabels.find((m) => m.wi === wi);
                  return (
                    <div key={wi} style={{ width: 12, flexShrink: 0, fontSize: 10, color: "#8b949e" }}>
                      {hit ? hit.label : ""}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: 2 }}>
                {/* Day label column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginRight: 4, width: 26, flexShrink: 0 }}>
                  {DAY_LABELS.map((d, i) => (
                    <div key={i} style={{ height: 10, fontSize: 9, color: "#8b949e", lineHeight: "10px", textAlign: "right" }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Week columns */}
                {weeks.map((w, wi) => (
                  <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {w.map((day, di) => (
                      <div
                        key={di}
                        title={day ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}` : ""}
                        style={{
                          width: 10, height: 10, borderRadius: 2, flexShrink: 0,
                          background: day ? LEVEL_COLORS[day.level] : LEVEL_COLORS[0],
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                <span style={{ fontSize: 10, color: "#8b949e" }}>
                  Learn how we count contributions
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ fontSize: 10, color: "#8b949e" }}>Less</span>
                  {LEVEL_COLORS.map((c, i) => (
                    <div key={i} style={{
                      width: 10, height: 10, borderRadius: 2,
                      background: c, border: "1px solid rgba(255,255,255,0.05)",
                    }} />
                  ))}
                  <span style={{ fontSize: 10, color: "#8b949e" }}>More</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Year pills (right column) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
          {YEARS.map((year) => {
            const active = year === selectedContributionYear;
            return (
              <button
                key={year}
                onClick={() => handleYear(year)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: "none",
                  background: active ? "#1f6feb" : "transparent",
                  color: active ? "#fff" : "#8b949e",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#e6edf3"; e.currentTarget.style.background = "#21262d"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "#8b949e"; e.currentTarget.style.background = "transparent"; } }}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;
