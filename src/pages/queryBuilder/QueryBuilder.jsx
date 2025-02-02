import { PlayIcon } from "@heroicons/react/24/outline";
import { Editor, loader } from "@monaco-editor/react";
import QueryBuilderTab from "components/queryBuilderTab/QueryBuilderTab";
import SettingDrawer from "components/settingDrawer/SettingDrawer";
import VisualizationDrawer from "components/visualizationDrawer/VisualizationDrawer";
import { useContext, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { masdrDevApi } from "shared/axios";
import CustomFlyoutModal from "shared/components/customFlyoutModal/CustomFlyoutModal";
import Dropdown from "shared/components/customInput/DropDown";
import InputField from "shared/components/customInput/InputField";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { queryBuilderTabEnum, userRole } from "shared/constant";
import { GlobalContext } from "shared/context/GlobalContext";
import {
  editorEvents,
  parseColumns,
  // queryResponseChartLineOptions,
  queryResponseChartOptions,
} from "shared/helper";

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
  const [graphId, setGraphId] = useState(""); // State for graphId
  // const [queryValue, setQueryValue] = useState("");
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [queryResponse, setQueryResponse] = useState([]);
  // console.log(queryResponse, "queryResponse");
  const [queryBuilderTab, setQueryBuilderTab] = useState("");
  const [tenants, setTenants] = useState([]); // State to store tenant list
  const [selectedTenant, setSelectedTenant] = useState(""); // Updated to match dynamic tenants
  const [selectedChartType, setSelectedChartType] = useState("bar");

  const [xAxis, setXAxis] = useState(""); // X-Axis Label
  const [yAxis, setYAxis] = useState(""); // Y-Axis Label

  const [selectedXAxisCol, setSelectedXAxisCol] = useState("");
  const [selectedYAxisCol, setSelectedYAxisCol] = useState("");

  const [queryValue, setQueryValue] = useState("");
  const [columnNames, setColumnNames] = useState([]);

  const { currentState, setCurrentState } = useContext(GlobalContext);

  // State to store extracted column names

  const [chartTitle, setChartTitle] = useState(""); // New state for chart title

  const resetState = () => {
    setGraphId(null); // Reset graphId
    setQueryLoading(false);
    setQueryError(false);
    setQueryResponse([]);
    setQueryBuilderTab("");
    setSelectedTenant(tenants.length > 0 ? tenants[0].label : "");
    setSelectedChartType("bar");
    setXAxis("");
    setYAxis("");
    setQueryValue("");
    setColumnNames([]);
    setChartTitle(""); // Reset chart title
    setSelectedXAxisCol("");
    setSelectedYAxisCol("");
  };

  const handleQueryChange = (val) => {
    setQueryValue(val);
  };

  const role = localStorage.getItem("role");

  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editor.onDidBlurEditorText(() => {
      const query = editor.getValue();
      const columns = parseColumns(query);

      console.log("Extracted Columns:", columns);
      setColumnNames(columns);
    });
  };

  // const fetchChartData = async () => {
  //   if (!queryValue) return;

  //   if (queryValue.includes("*")) {
  //     alert(
  //       "Queries containing '*' are not allowed. Please specify the columns explicitly."
  //     );
  //     return;
  //   }

  //   try {
  //     setQueryLoading(true);

  //     // If there's no graphId, generate a new one and run the POST API to create the data
  //     const newGraphId = graphId || Date.now(); // Use existing graphId if it's already set
  //     // let response;
  //     setGraphId(newGraphId);
  //     // If graphId exists, update the data with PUT API, otherwise create it with POST API
  //     if (graphId) {
  //       // Update data via PUT API if graphId is already present
  //       const chartData = {
  //         graphType: selectedChartType,
  //         query: queryValue, // The SQL query
  //         config: {
  //           colour: "#ff6361", // Static color, adjust as needed
  //         },
  //         graphId: graphId, // Use the existing graphId
  //         graphName: chartTitle || "Untitled Chart", // Use chartTitle or default
  //         xAxisLabel: xAxis || "X-Axis", // X-Axis label
  //         yAxisLabel: yAxis || "Y-Axis", // Y-Axis label
  //         xAxisColumnName: selectedXAxisCol || "X-Column", // First column for X-Axis
  //         yAxisColumnName: selectedYAxisCol || "Y-Column", // Second column for Y-Axis
  //       };

  //       const putEndpoint =
  //         role === userRole.SUPER_ADMIN
  //           ? `queries/state?paramTenantId=${selectedTenant}`
  //           : "queries/state";

  //       // Run the PUT API to update data
  //       response = await masdrDevApi.put(putEndpoint, chartData);
  //       console.log("Data updated successfully:", response.data);
  //     } else {

  //       // Otherwise, if graphId is not present, create a new entry via POST API
  //       response = await masdrDevApi.post(
  //         role === userRole.SUPER_ADMIN
  //           ? `query-runner/run?paramTenantId=${selectedTenant}`
  //           : "query-runner/run",
  //         {
  //           query: queryValue,
  //           tenant: selectedTenant,
  //           graphId: newGraphId, // Pass new graphId in the payload
  //         }
  //       );

  //       console.log("response =>", response.data);

  //       // Save the graphId in state after first POST response
  //       setGraphId(newGraphId);

  //       const chartData = {
  //         graphType: selectedChartType,
  //         query: queryValue, // The SQL query
  //         config: {
  //           colour: "#ff6361", // Static color, adjust as needed
  //         },
  //         graphId: graphId, // Use the existing graphId
  //         graphName: chartTitle || "Untitled Chart", // Use chartTitle or default
  //         xAxisLabel: xAxis || "X-Axis", // X-Axis label
  //         yAxisLabel: yAxis || "Y-Axis", // Y-Axis label
  //         xAxisColumnName: selectedXAxisCol || "X-Column", // First column for X-Axis
  //         yAxisColumnName: selectedYAxisCol || "Y-Column", // Second column for Y-Axis
  //       };
  //       const putEndpoint =
  //         role === userRole.SUPER_ADMIN
  //           ? `queries/state?paramTenantId=${selectedTenant}`
  //           : "queries/state";

  //       // Run the PUT API to update data
  //       const putResponse = await masdrDevApi.put(putEndpoint, chartData);
  //       console.log("Data updated successfully:", putResponse);
  //       console.log("Graph ID set:", newGraphId);
  //     }

  //     const seriesData = response?.data?.result?.map((item) => item.productId);
  //     console.log(seriesData, "seriesData");

  //     setQueryResponse([
  //       {
  //         name: response?.data?.tenant,
  //         data: seriesData,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setQueryError(true);
  //   } finally {
  //     setQueryLoading(false);
  //   }
  // };

  const fetchChartData = async () => {
    if (!queryValue) return;

    if (queryValue.includes("*")) {
      alert(
        "Queries containing '*' are not allowed. Please specify the columns explicitly."
      );
      return;
    }

    try {
      setQueryLoading(true);

      // Generate a new graphId if it doesn't exist
      const newGraphId = Date.now();
      // setGraphId(newGraphId);

      const chartData = {
        graphType: selectedChartType,
        query: queryValue,
        config: {
          colour: "#ff6361",
        },
        graphId: newGraphId,
        graphName: chartTitle || "Untitled Chart",
        xAxisLabel: xAxis || "X-Axis",
        yAxisLabel: yAxis || "Y-Axis",
        xAxisColumnName: selectedXAxisCol || "X-Column",
        yAxisColumnName: selectedYAxisCol || "Y-Column",
      };

      // POST API endpoint
      const postEndpoint =
        role === userRole.SUPER_ADMIN
          ? `queries/run?paramTenantId=${selectedTenant}`
          : "queries/run";

      // Run the POST API
      const postResponse = await masdrDevApi.post(postEndpoint, {
        query: queryValue,
        // tenant: selectedTenant,
        // graphId: newGraphId,
      });

      // PUT API endpoint
      const putEndpoint =
        role === userRole.SUPER_ADMIN
          ? `queries/state?paramTenantId=${selectedTenant}`
          : "queries/state";

      // Run the PUT API
      const putResponse = await masdrDevApi.put(putEndpoint, chartData);
      console.log("Data updated successfully via PUT API:", putResponse.data);

      console.log("Data fetched successfully via POST API:", postResponse.data);

      // Update the chart data after successful responses
      const seriesData = postResponse?.data?.map((item) => item.product_id);
      setQueryResponse([
        {
          name: postResponse?.data?.tenant,
          data: seriesData,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setQueryError(true);
    } finally {
      setQueryLoading(false);
    }
  };

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await masdrDevApi.get("/tenants", {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        });

        // Map tenant data from the API response
        const tenantList = res?.data?.data?.map((tenant) => ({
          label: tenant, // Use tenantId as the label
          type: "button", // Define button type
          action: () => setSelectedTenant(tenant), // Update selected tenant
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
            options={{
              ...queryResponseChartOptions,
              chart: {
                type: selectedChartType,
              },
              xaxis: {
                title: {
                  text: xAxis || "X-Axis", // Use xAxis value or default
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                  },
                },
              },
              yaxis: {
                title: {
                  text: yAxis || "Y-Axis", // Use yAxis value or default
                  style: {
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#333",
                  },
                },
              },
            }}
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
        <div className="flex items-center gap-4">
          <button
            onClick={resetState}
            className="btn-primary w-48 rounded-md h-9 p-0"
            // className="btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Add New Graph
          </button>
          {role === userRole.SUPER_ADMIN && (
            <Dropdown
              buttonText={selectedTenant || "Select Tenant"}
              items={tenants}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="bg-gray-100">
            <div className="flex justify-between items-center border-b border-gray-300 px-3 py-2">
              <div className="w-96">
                <InputField
                  placeholder="Enter Chart Title"
                  value={chartTitle} // Bind to chartTitle state
                  onChange={(e) => setChartTitle(e.target.value)}
                />
              </div>
            </div>
            <section className="flex items-start">
              <div className="w-[97%]">
                <Editor
                  options={{
                    minimap: { enabled: false },
                  }}
                  height="45vh"
                  width="100%"
                  theme="myTheme"
                  className="bg-gray-100"
                  defaultLanguage="sql"
                  onMount={onMount}
                  value={queryValue}
                  onChange={handleQueryChange} // Parse columns on change
                />
              </div>

              <div className="flex flex-col gap-5 py-2 items-center pe-4">
                {editorEvents.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        if (item.name === "Run Query") {
                          fetchChartData();
                          return;
                        } else if (editorRef.current && item.action) {
                          item.action(editorRef.current);
                        }
                      }}
                    >
                      {item.name === "Run Query" ? (
                        <div>
                          <button
                            className="btn-primary bg-indigo-600 hover:bg-indigo-500 text-gray-700 w-full flex justify-center items-center rounded-md h-9 p-1"
                            title="Submit"
                          >
                            <PlayIcon className="size-6 shrink-0 cursor-pointer text-white" />
                          </button>
                        </div>
                      ) : (
                        <item.icon
                          title={item.name}
                          aria-hidden="true"
                          className="size-6 shrink-0 cursor-pointer"
                        />
                      )}
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
        <SettingDrawer
          selectedXAxisCol={selectedXAxisCol}
          setSelectedXAxisCol={setSelectedXAxisCol}
          selectedYAxisCol={selectedYAxisCol}
          setSelectedYAxisCol={setSelectedYAxisCol}
          onClose={() => setQueryBuilderTab("")}
          columnNames={columnNames}
          xAxis={xAxis}
          setXAxis={setXAxis}
          yAxis={yAxis}
          setYAxis={setYAxis}
        />
      </CustomFlyoutModal>
    </div>
  );
};

export default QueryBuilder;
