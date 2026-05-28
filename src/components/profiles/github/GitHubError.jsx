const GitHubError = ({ message }) => (
  <div
    className="flex flex-col items-center justify-center gap-3 py-16 min-h-full"
    style={{ background: "#0d1117" }}
  >
    <p style={{ color: "#f85149" }} className="text-sm font-medium">
      Something went wrong
    </p>
    <p style={{ color: "#8b949e" }} className="text-xs">{message}</p>
  </div>
);

export default GitHubError;
