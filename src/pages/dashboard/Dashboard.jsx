import Chart from "react-apexcharts";
import { dummyData } from "shared/dummyData";
import { options } from "shared/helper";

const Dashboard = () => {
  return (
    <div className="pt-10">
      <div className="flex flex-col gap-8">
        {dummyData.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between w-full mb-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <button
                      type="button"
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  {item.data.map((seriesData, index) => (
                    <div key={index} style={{ marginBottom: "2rem" }}>
                      <Chart
                        series={seriesData}
                        options={options}
                        type="bar"
                        height={300}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
