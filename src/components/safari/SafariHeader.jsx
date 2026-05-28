import WindowControls from "#/components/WindowControls";
import SafariAddressBar from "./SafariAddressBar";
import SafariTabs from "./SafariTabs";
import { TABS } from "./SafariTabs";
import useSafariStore from "#/store/safari/safariStore";

const SafariHeader = () => {
  const activeTab = useSafariStore((s) => s.activeTab);
  const currentTab = TABS.find((t) => t.id === activeTab);

  return (
    <div className="flex flex-col select-none shrink-0" style={{ background: "#ececec" }}>
      {/* Toolbar row */}
      <div
        className="flex items-center h-10"
        style={{ borderBottom: "1px solid #c8c8c8" }}
      >
        {/* Traffic lights */}
        <div className="px-3">
          <WindowControls target="safari" />
        </div>

        {/* Address bar + nav buttons */}
        <SafariAddressBar url={currentTab?.url ?? ""} />
      </div>

      {/* Tab strip */}
      <SafariTabs />
    </div>
  );
};

export default SafariHeader;
