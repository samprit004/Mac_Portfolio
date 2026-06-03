import { Bell, Plus, ChevronDown } from "lucide-react";
import { profileConfig } from "#/data/profiles/profileConfig";

const GHLogo = () => (
  <svg height="32" viewBox="0 0 16 16" style={{ fill: "#fff", flexShrink: 0 }} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, fill: "#848d97", flexShrink: 0 }} aria-hidden="true">
    <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
  </svg>
);

const NavBtn = ({ children, title }) => (
  <button
    title={title}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      padding: "4px 6px",
      borderRadius: 6,
      background: "transparent",
      border: "none",
      color: "rgba(255,255,255,0.72)",
      cursor: "pointer",
      transition: "color 0.15s, background 0.15s",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.72)"; e.currentTarget.style.background = "transparent"; }}
  >
    {children}
  </button>
);

const GitHubNavBar = ({ avatarUrl }) => (
  <header
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 16px",
      background: "#161b22",
      borderBottom: "1px solid #30363d",
      flexShrink: 0,
    }}
  >
    {/* Logo */}
    <a href={profileConfig.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexShrink: 0, marginRight: 4 }}>
      <GHLogo />
    </a>

    {/* Search bar */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 10px",
        borderRadius: 6,
        background: "#0d1117",
        border: "1px solid #30363d",
        color: "#848d97",
        minWidth: 240,
        maxWidth: 320,
        flex: 1,
        cursor: "text",
      }}
    >
      <SearchIcon />
      <span style={{ flex: 1, fontSize: 13, color: "#848d97" }}>Type <kbd style={{ fontSize: 11, border: "1px solid #444c56", borderRadius: 4, padding: "0 4px", color: "#8b949e", background: "transparent" }}>/</kbd> to search</span>
    </div>

    {/* Spacer */}
    <div style={{ flex: 1 }} />

    {/* Right side actions */}
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Notifications */}
      <NavBtn title="Notifications">
        <div style={{ position: "relative" }}>
          <Bell size={16} />
          <span style={{
            position: "absolute",
            top: -2,
            right: -2,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#2f81f7",
            border: "1px solid #161b22",
          }} />
        </div>
      </NavBtn>

      {/* Create new */}
      <NavBtn title="Create new">
        <Plus size={16} />
        <ChevronDown size={12} />
      </NavBtn>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: "#30363d", margin: "0 4px" }} />

      {/* User avatar */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          padding: "2px 4px",
          borderRadius: 6,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        title={profileConfig.githubUsername}
      >
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="avatar"
            style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)" }}
          />
        )}
        <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
      </button>
    </div>
  </header>
);

export default GitHubNavBar;
