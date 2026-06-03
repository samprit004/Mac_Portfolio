import { MapPin, Link2, Users } from "lucide-react";

const GitHubHero = ({ data }) => (
  <div className="flex flex-col gap-4">
    {/* Avatar */}
    <img
      src={data.avatar_url}
      alt={data.login}
      className="w-full rounded-full object-cover"
      style={{ border: "1px solid #30363d", aspectRatio: "1/1" }}
    />

    {/* Name / username */}
    <div>
      <h1 style={{ color: "#e6edf3", fontSize: "20px", fontWeight: 600, lineHeight: 1.25 }}>
        {data.name || data.login}
      </h1>
      <p style={{ color: "#8b949e", fontSize: "16px", fontWeight: 300, marginTop: "2px" }}>
        {data.login}
      </p>
    </div>

    {/* Bio */}
    {data.bio && (
      <p style={{ color: "#e6edf3", fontSize: "14px", lineHeight: 1.6 }}>{data.bio}</p>
    )}

    {/* Follow button */}
    <a
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-center text-sm font-medium rounded-md py-1 transition-colors"
      style={{
        background: "#21262d",
        border: "1px solid #30363d",
        color: "#e6edf3",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#30363d")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#21262d")}
    >
      Follow
    </a>

    {/* Followers / Following */}
    <div className="flex items-center gap-1.5 flex-wrap" style={{ fontSize: "14px" }}>
      <Users size={14} style={{ color: "#8b949e" }} />
      <a
        href={`${data.html_url}?tab=followers`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
        style={{ color: "#8b949e" }}
      >
        <span style={{ color: "#e6edf3", fontWeight: 600 }}>{data.followers}</span>
        {" followers"}
      </a>
      <span style={{ color: "#8b949e" }}>·</span>
      <a
        href={`${data.html_url}?tab=following`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
        style={{ color: "#8b949e" }}
      >
        <span style={{ color: "#e6edf3", fontWeight: 600 }}>{data.following}</span>
        {" following"}
      </a>
    </div>

    {/* Location */}
    {data.location && (
      <div className="flex items-center gap-2" style={{ fontSize: "14px", color: "#8b949e" }}>
        <MapPin size={14} />
        <span>{data.location}</span>
      </div>
    )}

    {/* Website */}
    {data.blog && (
      <div className="flex items-center gap-2" style={{ fontSize: "14px" }}>
        <Link2 size={14} style={{ color: "#8b949e" }} />
        <a
          href={data.blog.startsWith("http") ? data.blog : `https://${data.blog}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline truncate"
          style={{ color: "#58a6ff" }}
        >
          {data.blog}
        </a>
      </div>
    )}

    {/* Public repos stat */}
    <div style={{ fontSize: "13px", color: "#8b949e", borderTop: "1px solid #30363d", paddingTop: "12px" }}>
      <span style={{ color: "#e6edf3", fontWeight: 600 }}>{data.public_repos}</span> public repositories
    </div>
  </div>
);

export default GitHubHero;
