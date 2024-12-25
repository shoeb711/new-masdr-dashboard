import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { PATH, userRole } from "shared/constant";
import { options } from "shared/helper";
import { masdrDevApi } from "shared/axios";
import { useEffect, useState } from "react";

const DashboardCard = (props) => {
  const { selectedTenant, query, graphName, graphId, graphType } = props;

  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [queryResponse, setQueryResponse] = useState([]);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const fetchChartData = async () => {
    try {
      setQueryLoading(true);

      const response = await masdrDevApi.post(
        role === userRole.SUPER_ADMIN
          ? `query-runner/run?paramTenantId=${selectedTenant}`
          : "query-runner/run",
        {
          query: query,
          tenant: selectedTenant,
        }
      );

      // console.log("response =>", response.data);
      const seriesData = response?.data?.result?.map((item) => item.productId);

      setQueryResponse([
        {
          name: response?.data?.tenant,
          data: seriesData,
        },
      ]);
    } catch (error) {
      console.log("error", error);

      setQueryError(true);
    } finally {
      setQueryLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const renderChartData = () => {
    if (queryLoading) {
      return <p>Loading...</p>;
    } else if (queryError) {
      return <p>Something went wrong.</p>;
    } else {
      return (
        <div className="w-full" key={graphId}>
          <Chart
            series={graphType === "pie" ? queryResponse[0].data : queryResponse}
            options={options}
            type={graphType}
            height={300}
          />
        </div>
      );
    }
  };

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {/* <div className="px-4 py-5 sm:p-6 grid md:grid-cols-2 gap-8"> */}
      <div className="flex flex-col gap-3 items-end border border-gray-200 rounded-lg p-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-base font-semibold text-gray-900">{graphName}</h3>
          <button
            type="button"
            className="w-20 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() =>
              navigate(`${PATH.editqueryBuilder}/${graphId}`, {
                state: {
                  singleChartData: queryResponse,
                },
              })
            }
          >
            Edit
          </button>
        </div>

        {renderChartData()}
      </div>
      {/* </div> */}
    </div>
  );
};
export default DashboardCard;
