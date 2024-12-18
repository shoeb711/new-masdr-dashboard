import { useState } from "react";

const tabs = [{ name: "Some" }, { name: "All" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SettingDisplayContent = () => {
  const [selectedTab, setSelectedTab] = useState("Some");
  return (
    <div className="flex flex-col gap-2">
      <p>Values to show</p>
      <div className="isolate flex divide-x divide-indigo-600 rounded-lg border border-indigo-600">
        {tabs.map((tab, tabIdx) => (
          <button
            key={tab.name}
            onClick={() => setSelectedTab(tab.name)}
            className={classNames(
              selectedTab === tab.name
                ? "text-white"
                : "text-gray-500 hover:text-gray-700",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
              `group relative min-w-0 flex-1 overflow-hidden ${
                selectedTab === tab.name
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-white hover:bg-gray-50"
              }  px-4 py-2 text-center text-sm font-medium focus:z-10`
            )}
          >
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingDisplayContent;
