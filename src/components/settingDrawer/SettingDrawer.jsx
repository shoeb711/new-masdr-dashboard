import SettingDataContent from "components/settingDataContent/SettingDataContent";
import SettingDisplayContent from "components/settingDisplayContent/SettingDisplayContent";
import { useState } from "react";

const tabs = [{ name: "data" }, { name: "display" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SettingDrawer = ({ selectedXAxisCol,setSelectedXAxisCol,selectedYAxisCol, setSelectedYAxisCol,onClose , columnNames=[] ,xAxis,setXAxis,yAxis,setYAxis }) => {
  const [selectedSettingTab, setSelectedSettingTab] = useState("data");

  const renderSettingDrawerContent = (tab) => {
    switch (tab) {
      case "data":
        return <SettingDataContent onClose={onClose}
        selectedXAxisCol={selectedXAxisCol}
        setSelectedXAxisCol={setSelectedXAxisCol}
        selectedYAxisCol={selectedYAxisCol}
        setSelectedYAxisCol={setSelectedYAxisCol}
         columnNames={columnNames} />;

      case "display":
        return <SettingDisplayContent onClose={onClose} xAxis={xAxis}
        setXAxis={setXAxis}
        yAxis={yAxis}
        setYAxis={setYAxis} />;

      case "axes":
        return <div>Axes content</div>;

      default:
        break;
    }
  };
  // const handleSubmit = () => {
  //   if (!selectedXAxisCol || !selectedYAxisCol) {
  //     setErrorMessage("Please select both X-axis and Y-axis.");
  //     return;
  //   }

  //   if (selectedXAxisCol === selectedYAxisCol) {
  //     setErrorMessage("X-axis and Y-axis cannot be the same.");
  //     return;
  //   }

  //   alert(`Selections are valid! X-axis: ${selectedXAxisCol}, Y-axis: ${selectedYAxisCol}`);
  // };

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
                    "w-1/4 border-b-2 px-1 pb-4 text-center text-sm font-medium capitalize"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* tab content */}
        <div className="mt-3">
          {renderSettingDrawerContent(selectedSettingTab)}
        </div>
      </div>

    </div>
  );
};

export default SettingDrawer;
