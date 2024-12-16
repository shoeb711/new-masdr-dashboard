import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const VISUALIZATION_BUTTONS = [
  { title: "Bar", icon: ChartBarIcon },
  { title: "Line", icon: ArrowTrendingUpIcon },
  { title: "Pie", icon: ChartPieIcon },
];

const VisualizationDrawer = () => {
  const [selectedVisualizeBtn, setSelectedVisualizeBtn] = useState("");

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between flex-wrap">
          {VISUALIZATION_BUTTONS.map((item, index) => (
            <div
              onClick={() => setSelectedVisualizeBtn(item.title)}
              key={index}
              className="flex flex-col items-center justify-center gap-1"
            >
              <div
                className={`border rounded-full w-12 h-12 flex items-center justify-center cursor-pointer ${
                  selectedVisualizeBtn === item.title
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "hover:bg-gray-50"
                } `}
              >
                <item.icon
                  className={`${
                    selectedVisualizeBtn === item.title
                      ? "text-white"
                      : "text-indigo-600"
                  } size-5`}
                />
              </div>
              <p
                className={`${
                  selectedVisualizeBtn === item.title
                    ? "text-indigo-600"
                    : "text-gray-600"
                } font-semibold`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="btn-primary w-48">Done</button>
      </div>
    </div>
  );
};

export default VisualizationDrawer;
