const GitHubLoading = () => (
  <div
    className="flex flex-col items-center justify-center gap-4 py-16 min-h-full"
    style={{ background: "#0d1117" }}
  >
    <div
      className="size-10 rounded-full border-2 border-t-transparent animate-spin"
      style={{ borderColor: "#30363d", borderTopColor: "transparent" }}
    />
    <p style={{ color: "#8b949e" }} className="text-sm">Loading…</p>
  </div>
);

export default GitHubLoading;
