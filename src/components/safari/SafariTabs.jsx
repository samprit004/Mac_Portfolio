import useSafariStore from "#/store/safari/safariStore";
import { profileConfig } from "#/data/profiles/profileConfig";
import { X } from "lucide-react";

const GHFavicon = () => (
  <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, fill: "var(--safari-text)", flexShrink: 0 }} aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const TABS = [
  {
    id: "github",
    label: "samprit004 (Samprit Das) · GitHub",
    Favicon: GHFavicon,
    url: profileConfig.githubUrl,
  },
];

const SafariTabs = () => {
  const { activeTab, setActiveTab, fetchGitHubProfile } = useSafariStore();

  const handleTab = (tab) => {
    setActiveTab(tab.id);
    if (tab.id === "github") fetchGitHubProfile(profileConfig.githubUsername);
  };

  return (
    <div
      className="flex items-end gap-0 px-2 select-none"
      style={{ background: "var(--safari-tab-strip-bg)", height: "30px" }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTab(tab)}
            title={tab.label}
            style={
              isActive
                ? {
                    background: "var(--safari-tab-active-bg)",
                    borderRadius: "6px 6px 0 0",
                    borderTop: "1px solid var(--safari-tab-border)",
                    borderLeft: "1px solid var(--safari-tab-border)",
                    borderRight: "1px solid var(--safari-tab-border)",
                    boxShadow: "0 -1px 3px rgba(0,0,0,0.07)",
                    zIndex: 2,
                  }
                : {
                    background: "transparent",
                    borderRadius: "6px 6px 0 0",
                  }
            }
            className={`relative flex items-center gap-1.5 px-3 h-[26px] text-xs cursor-pointer transition-all max-w-[180px] shrink-0 ${
              isActive ? "" : "hover:bg-white/30"
            }`}
          >
            <tab.Favicon />
            <span
              className="truncate"
              style={{ color: isActive ? "var(--safari-text)" : "var(--safari-muted)", maxWidth: "130px" }}
            >
              {tab.label}
            </span>
            {isActive && (
              <X
                size={12}
                className="ml-auto shrink-0 rounded"
                style={{ color: 'var(--safari-address-icon)' }}
              />
            )}
          </button>
        );
      })}

    </div>
  );
};

export default SafariTabs;
