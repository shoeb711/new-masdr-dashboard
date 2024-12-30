import DashboardCard from "components/dashboardCard/DashboardCard";
import { useContext, useEffect, useState } from "react";
import { masdrDevApi } from "shared/axios";
import Dropdown from "shared/components/customInput/DropDown";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { userRole } from "shared/constant";
import { GlobalContext } from "shared/context/GlobalContext";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const {
    currentState,
    selectedTenant,
    setSelectedTenant,
    isLoading,
  } = useContext(GlobalContext);

  const [tenants, setTenants] = useState([]);
  const [loadingTenants, setLoadingTenants] = useState(false);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoadingTenants(true);
        const res = await masdrDevApi.get("/tenant/tenantlist", {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });
        const tenantList = res?.data?.data?.map((tenant) => ({
          label: tenant.tenantId,
          type: "button",
          action: () => setSelectedTenant(tenant.tenantId),
        }));

        setTenants(tenantList);
        console.log("tenantList", tenantList);
        
        if (tenantList.length > 0 && !selectedTenant) {
          setSelectedTenant(tenantList[0].label);
        }
      } catch (error) {
        console.error("Error fetching tenant list:", error);
      } finally {
        setLoadingTenants(false);
      }
    };

    fetchTenants();
  }, [setSelectedTenant, selectedTenant]);

  const renderDashboardCard = () => {
    if (loadingTenants || isLoading) {
      return <PrimaryLoader />;
    } else {
      return (
        <div className="grid md:grid-cols-2 gap-8">
          {selectedTenant &&
            currentState?.map((item, idx) => (
              <DashboardCard
                key={idx}
                {...item}
                selectedTenant={selectedTenant}
              />
            ))}
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
