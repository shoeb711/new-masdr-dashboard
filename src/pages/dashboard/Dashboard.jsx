import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { masdrDevApi } from "shared/axios";
import Dropdown from "shared/components/customInput/DropDown";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { PATH, userRole } from "shared/constant";
import { dummyData } from "shared/dummyData";
import { options } from "shared/helper";
import { useFetch } from "shared/hooks/useFetch";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(
    masdrDevApi,
    `/currentstate/getcurrentstate?paramTenantId=${selectedTenant}`
  );

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        const res = await masdrDevApi.get("/tenant/tenantlist", {
          headers: {
            "ngrok-skip-browser-warning": true, // Custom header
          },
        });
        const tenantList = res?.data?.data?.map((tenant) => ({
          label: tenant.tenantId, // Use tenantId as the label
          type: "button", // Define button type
          action: () => setSelectedTenant(tenant.tenantId), // Update selected tenant
        }));

        setTenants(tenantList); // Update tenants with dynamic data
        if (tenantList.length > 0) {
          setSelectedTenant(tenantList[0].label); // Default to the first tenant
        }
      } catch (error) {
        console.error("Error fetching tenant list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div>
      <div className="flex justify-between py-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        {role === userRole.SUPER_ADMIN && (
          <Dropdown
            buttonText={selectedTenant || "Select Tenant"}
            items={tenants}
          />
        )}
      </div>

      <div className="flex flex-col gap-8">
        {loading ? (
          <>
            <PrimaryLoader />
          </>
        ) : (
          selectedTenant &&
          dummyData.map((item, idx) => {
            return (
              <div key={idx}>
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                  <div className="px-4 py-5 sm:p-6 grid md:grid-cols-2 gap-8">
                    {item.data.map((seriesData, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-3 items-end border border-gray-200 rounded-lg p-2"
                      >
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-base font-semibold text-gray-900">
                            {seriesData[0]?.name}
                          </h3>
                          <button
                            type="button"
                            className="w-20 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() =>
                              navigate(`${PATH.editqueryBuilder}/${index}`, {
                                state: {
                                  singleChartData: seriesData,
                                },
                              })
                            }
                          >
                            Edit
                          </button>
                        </div>

                        <div className="w-full" key={index}>
                          <Chart
                            series={seriesData}
                            options={options}
                            type={item.type}
                            height={300}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
