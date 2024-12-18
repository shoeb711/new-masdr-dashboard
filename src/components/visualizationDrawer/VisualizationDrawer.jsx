import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const VISUALIZATION_BUTTONS = [
  { title: "bar", icon: ChartBarIcon, value: "bar" },
  { title: "line", icon: ArrowTrendingUpIcon, value: "line" },
  { title: "pie", icon: ChartPieIcon, value: "pie" },
];

const VisualizationDrawer = ({
  selectedChartType,
  setSelectedChartType,
  onClose,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between flex-wrap">
          {VISUALIZATION_BUTTONS.map((item, index) => (
            <div
              onClick={() => {
                setSelectedChartType(item.title);
              }}
              key={index}
              className="flex flex-col items-center justify-center gap-1"
            >
              <div
                className={`border rounded-full w-12 h-12 flex items-center justify-center cursor-pointer ${
                  selectedChartType === item.title
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "hover:bg-gray-50"
                } `}
              >
                <item.icon
                  className={`${
                    selectedChartType === item.title
                      ? "text-white"
                      : "text-indigo-600"
                  } size-5`}
                />
              </div>
              <p
                className={`${
                  selectedChartType === item.title
                    ? "text-indigo-600"
                    : "text-gray-600"
                } font-semibold capitalize`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={onClose} className="btn-primary w-48">
          Done
        </button>
      </div>
    </div>
  );
};

export default VisualizationDrawer;
