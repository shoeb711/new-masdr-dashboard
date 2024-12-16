import { useState } from "react";

const tabs = [
  { name: "Data", href: "#", current: false },
  { name: "Display", href: "#", current: false },
  { name: "Axes", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SettingDrawer = () => {
  const [selectedSettingTab, setSelectedSettingTab] = useState("");

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex justify-around">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setSelectedSettingTab(tab.name)}
                  className={classNames(
                    selectedSettingTab === tab.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="btn-primary w-48">Done</button>
      </div>
    </div>
  );
};

export default SettingDrawer;
