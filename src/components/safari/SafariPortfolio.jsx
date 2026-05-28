import useSafariStore from "#/store/safari/safariStore";
import SafariHeader from "./SafariHeader";
import GitHubProfile from "#/components/profiles/github/GitHubProfile";

const SafariPortfolio = () => {
  const activeTab = useSafariStore((s) => s.activeTab);

  return (
    <div className="flex flex-col h-full" style={{ background: "#ffffff" }}>
      <SafariHeader />
      <div
        key={activeTab}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ animation: "safFade 0.12s ease" }}
      >
        <GitHubProfile />
      </div>
      <style>{`
        @keyframes safFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SafariPortfolio;
