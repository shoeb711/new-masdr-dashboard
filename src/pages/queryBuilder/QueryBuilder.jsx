import { Editor, loader } from "@monaco-editor/react";
import QueryBuilderTab from "components/queryBuilderTab/QueryBuilderTab";
import SettingDrawer from "components/settingDrawer/SettingDrawer";
import VisualizationDrawer from "components/visualizationDrawer/VisualizationDrawer";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { masdrDevApi } from "shared/axios";
import CustomFlyoutModal from "shared/components/customFlyoutModal/CustomFlyoutModal";
import Dropdown from "shared/components/customInput/DropDown";
import InputField from "shared/components/customInput/InputField";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { queryBuilderTabEnum, userRole } from "shared/constant";
import {
  editorEvents,
  queryResponseChartLineOptions,
  queryResponseChartOptions,
} from "shared/helper";

const options = {
  minimap: {
    enabled: false,
  },
};

loader.init().then((monaco) => {
  monaco.editor.defineTheme("myTheme", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#f3f4f6",
    },
  });
});

const QueryBuilder = () => {
  const [queryValue, setQueryValue] = useState("");
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [queryResponse, setQueryResponse] = useState([]);
  const [queryBuilderTab, setQueryBuilderTab] = useState("");
  const [tenants, setTenants] = useState([]); // State to store tenant list
  const [selectedTenant, setSelectedTenant] = useState(""); // Updated to match dynamic tenants
  const [selectedChartType, setSelectedChartType] = useState("bar");

  const role = localStorage.getItem("role");

  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const fetchChartData = async () => {
    if (!queryValue) return;

    try {
      setQueryLoading(true);

      const response = await masdrDevApi.post("query-runner/run", {
        query: queryValue,
        tenant: selectedTenant,
      });

      console.log("response =>", response.data);
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
    const fetchTenants = async () => {
      try {
        const res = await masdrDevApi.get("/tenant/tenantlist", {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });

        // Map tenant data from the API response
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
      }
    };

    fetchTenants();
  }, []);

  const renderQueryOutput = () => {
    if (queryLoading) {
      return <PrimaryLoader />;
    } else if (queryError) {
      return <div>Something went wrong</div>;
    } else {
      return !!queryResponse?.length ? (
        <div className="pt-10">
          <p className="capitalize">
            {!!queryResponse?.length ? queryResponse[0]?.name : ""}
          </p>
          <Chart
            options={
              selectedChartType === "line"
                ? queryResponseChartLineOptions
                : queryResponseChartOptions
            }
            key={selectedChartType}
            series={
              selectedChartType === "pie"
                ? queryResponse[0].data
                : queryResponse
            }
            type={selectedChartType}
            height="350"
          />
        </div>
      ) : null;
    }
  };

  return (
    <div className="h-[calc(100%-64px)]">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-bold">QUERY BUILDER</h1>
        {role === userRole.SUPER_ADMIN && (
          <Dropdown
            buttonText={selectedTenant || "Select Tenant"}
            items={tenants}
          />
        )}
      </div>

      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="bg-gray-100">
            <div className="flex justify-between items-center border-b border-gray-300 px-3 py-2">
              <div className="w-96">
                <InputField placeholder="Enter Chart Title" />
              </div>
            </div>
            <section className="flex items-start">
              <div className="w-[97%]">
                <Editor
                  options={options}
                  height="45vh"
                  width="100%"
                  theme="myTheme"
                  className="bg-gray-100"
                  defaultLanguage="sql"
                  onMount={onMount}
                  value={queryValue}
                  onChange={(val) => {
                    setQueryValue(val);
                  }}
                />
              </div>
              <div className="flex flex-col gap-5 py-2 items-center pe-4">
                {editorEvents.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        if (item.name === "Run Query") {
                          fetchChartData();
                        } else if (editorRef.current && item.action) {
                          item.action(editorRef.current);
                        }
                      }}
                    >
                      <item.icon
                        title={item.name}
                        aria-hidden="true"
                        className="size-6 shrink-0 cursor-pointer"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>{renderQueryOutput()}</div>
        </div>

        <QueryBuilderTab
          setQueryBuilderTab={setQueryBuilderTab}
          queryBuilderTab={queryBuilderTab}
        />
      </div>

      <CustomFlyoutModal
        isOpen={queryBuilderTab === queryBuilderTabEnum.VISUALIZATION}
        onClose={() => setQueryBuilderTab("")}
        modalClassName="overflow-visible"
      >
        <VisualizationDrawer
          setSelectedChartType={setSelectedChartType}
          selectedChartType={selectedChartType}
          onClose={() => setQueryBuilderTab("")}
        />
      </CustomFlyoutModal>

      <CustomFlyoutModal
        isOpen={queryBuilderTab === queryBuilderTabEnum.SETTING}
        onClose={() => setQueryBuilderTab("")}
      >
        onClose={() => setQueryBuilderTab("")}
        <SettingDrawer />
      </CustomFlyoutModal>
    </div>
  );
};

export default QueryBuilder;
