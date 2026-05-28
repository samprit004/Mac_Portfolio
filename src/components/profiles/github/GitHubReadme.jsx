import { useEffect } from "react";
import { marked } from "marked";
import useSafariStore from "#/store/safari/safariStore";
import { profileConfig } from "#/data/profiles/profileConfig";

marked.setOptions({ gfm: true, breaks: true });

const GitHubReadme = () => {
  const { githubReadme, fetchReadme } = useSafariStore();

  useEffect(() => {
    fetchReadme(profileConfig.githubUsername);
  }, []); // eslint-disable-line

  if (!githubReadme) return null;

  const html = marked.parse(githubReadme);

  return (
    <>
      <style>{`
        .gh-readme { color: #e6edf3; font-size: 14px; line-height: 1.6; }
        .gh-readme h1 { font-size: 22px; font-weight: 700; border-bottom: 1px solid #30363d; padding-bottom: 8px; margin: 0 0 16px; color: #e6edf3; }
        .gh-readme h2 { font-size: 18px; font-weight: 600; border-bottom: 1px solid #30363d; padding-bottom: 6px; margin: 20px 0 12px; color: #e6edf3; }
        .gh-readme h3 { font-size: 15px; font-weight: 600; margin: 16px 0 8px; color: #e6edf3; }
        .gh-readme h4, .gh-readme h5, .gh-readme h6 { font-size: 13px; font-weight: 600; margin: 12px 0 6px; color: #e6edf3; }
        .gh-readme p { margin: 0 0 12px; }
        .gh-readme a { color: #58a6ff; text-decoration: none; }
        .gh-readme a:hover { text-decoration: underline; }
        .gh-readme code { background: #161b22; border: 1px solid #30363d; border-radius: 4px; padding: 2px 5px; font-size: 12px; font-family: 'SFMono-Regular', Consolas, monospace; color: #e6edf3; }
        .gh-readme pre { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 14px; overflow-x: auto; margin: 0 0 14px; }
        .gh-readme pre code { background: transparent; border: none; padding: 0; font-size: 12px; }
        .gh-readme ul, .gh-readme ol { padding-left: 24px; margin: 0 0 12px; }
        .gh-readme li { margin: 4px 0; }
        .gh-readme blockquote { border-left: 3px solid #30363d; margin: 0 0 12px; padding: 4px 12px; color: #8b949e; }
        .gh-readme img { max-width: 100%; border-radius: 4px; }
        .gh-readme hr { border: none; border-top: 1px solid #30363d; margin: 20px 0; }
        .gh-readme table { border-collapse: collapse; width: 100%; margin: 0 0 12px; }
        .gh-readme th, .gh-readme td { border: 1px solid #30363d; padding: 6px 12px; }
        .gh-readme th { background: #161b22; font-weight: 600; }
        .gh-readme tr:nth-child(even) { background: rgba(255,255,255,0.02); }
      `}</style>
      <div
        className="gh-readme"
        style={{
          padding: "16px",
          border: "1px solid #30363d",
          borderRadius: 6,
          background: "#0d1117",
          marginBottom: 20,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default GitHubReadme;
