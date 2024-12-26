import DashboardCard from "components/dashboardCard/DashboardCard";
import { useEffect, useState } from "react";
import { masdrDevApi } from "shared/axios";
import Dropdown from "shared/components/customInput/DropDown";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { userRole } from "shared/constant";
import { useFetch } from "shared/hooks/useFetch";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useFetch(
    masdrDevApi,
    `/currentstate/getcurrentstate?paramTenantId=${selectedTenant}`
  );
  const graphData = data?.data?.graphList;

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

  const renderDashboardCard = () => {
    if (loading) {
      return <PrimaryLoader />;
    } else {
      return (
        <div className="grid md:grid-cols-2 gap-8">
          {selectedTenant &&
            graphData?.map((item, idx) => {
              return (
                <DashboardCard
                  key={idx}
                  {...item}
                  selectedTenant={selectedTenant}
                />
              );
            })}
        </div>
      );
    }
  };

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

      {renderDashboardCard()}
    </div>
  );
};

export default Dashboard;
