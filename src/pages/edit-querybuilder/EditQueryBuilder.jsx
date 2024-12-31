import { PlayIcon } from "@heroicons/react/24/outline";
import { Editor, loader } from "@monaco-editor/react";
import QueryBuilderTab from "components/queryBuilderTab/QueryBuilderTab";
import SettingDrawer from "components/settingDrawer/SettingDrawer";
import VisualizationDrawer from "components/visualizationDrawer/VisualizationDrawer";
import { useContext, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useLocation, useNavigate } from "react-router-dom";
import { masdrDevApi } from "shared/axios";
import CustomFlyoutModal from "shared/components/customFlyoutModal/CustomFlyoutModal";
import Dropdown from "shared/components/customInput/DropDown";
import InputField from "shared/components/customInput/InputField";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { PATH, queryBuilderTabEnum, userRole } from "shared/constant";
import { GlobalContext } from "shared/context/GlobalContext";
import {
  editorEvents,
  parseColumns,
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

const EditQueryBuilder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    selectedTenant,
    query,
    graphName,
    graphId,
    graphType,
    singleChartData,
    xAxisColumnName,
    yAxisColumnName,
    xAxisLable,
    yAxisLabel,
  } = state;

  console.log("state =>", state);

  const { currentState, setCurrentState } = useContext(GlobalContext);

  const [queryValue, setQueryValue] = useState(!!query ? query : "");
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [queryBuilderTab, setQueryBuilderTab] = useState("");
  const [selectedChartType, setSelectedChartType] = useState(
    !!graphType ? graphType : "bar"
  );
  const [queryResponse, setQueryResponse] = useState(
    !!singleChartData?.length ? singleChartData : []
  );
  const [chartInputValue, setChartInputValue] = useState(
    !!graphName ? graphName : ""
  );
  const [xAxis, setXAxis] = useState(!!xAxisLable ? xAxisLable : ""); // X-Axis Label
  const [yAxis, setYAxis] = useState(!!yAxisLabel ? yAxisLabel : ""); // Y-Axis Label
  const [columnNames, setColumnNames] = useState([]); // State to store extracted column names
  const [selectedXAxisCol, setSelectedXAxisCol] = useState(
    !!xAxisColumnName ? xAxisColumnName : ""
  );
  const [selectedYAxisCol, setSelectedYAxisCol] = useState(
    !!yAxisColumnName ? yAxisColumnName : ""
  );

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

  const fetchChartData = async () => {
    if (!queryValue) return;

    if (queryValue.includes("*")) {
      alert(
        "Queries containing '*' are not allowed. Please specify the columns explicitly."
      );
      return;
    }

    // const editData = {
    //   globalConfiguration: {},
    //   graphList: [
    //     ...currentState,
    //     {
    //       graphType: selectedChartType,
    //       query: queryValue,
    //       config: {
    //         colour: "#ff6361",
    //       },
    //       graphId: graphId,
    //       graphName: chartInputValue,
    //       xAxisLable: xAxis,
    //       yAxisLabel: yAxis,
    //       xAxisColumnName: selectedXAxisCol,
    //       yAxisColumnName: selectedYAxisCol,
    //     },
    //   ],
    // };

    const updatedState = currentState.map((item) => {
      if (item.graphId === graphId) {
        return {
          ...item,
          graphType: selectedChartType,
          query: queryValue,
          graphName: chartInputValue,
          xAxisLable: xAxis,
          yAxisLabel: yAxis,
          xAxisColumnName: selectedXAxisCol,
          yAxisColumnName: selectedYAxisCol,
        };
      }
      return item;
    });

    try {
      setQueryLoading(true);

      const response = await masdrDevApi.post(
        role === userRole.SUPER_ADMIN
          ? `query-runner/run?paramTenantId=${selectedTenant}`
          : "query-runner/run",
        {
          query: queryValue,
          tenant: selectedTenant,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );

      const putRes = await masdrDevApi.put(
        `/currentstate/updatecurrentstate?paramTenantId=${selectedTenant}`,
        // editData
        {
          globalConfiguration: {},
          graphList: updatedState,
        }
      );

      console.log("putRes", putRes);

      setCurrentState(updatedState);

      const seriesData = response?.data?.result?.map((item) => item.productId); // Y-axis values

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

  const renderQueryOutput = () => {
    if (queryLoading) {
      return <PrimaryLoader />;
    } else if (queryError) {
      return <div>Something went wrong</div>;
    } else {
      return (
        <div className="pt-10">
          <p className="capitalize">
            {!!queryResponse?.length ? queryResponse[0]?.name : ""} for ID:{" "}
            {graphId}
          </p>
          <Chart
            options={
              selectedChartType === "line"
                ? {
                    ...queryResponseChartLineOptions,
                    xaxis: {
                      title: {
                        text: xAxis || "",
                        style: {
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#333",
                        },
                      },
                    },
                    yaxis: {
                      title: {
                        text: yAxis || "",
                        style: {
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#333",
                        },
                      },
                    },
                  }
                : {
                    ...queryResponseChartOptions,
                    xaxis: {
                      title: {
                        text: xAxis || "",
                        style: {
                          fontSize: "14px",
                          fontWeight: "semibold",
                          color: "#333",
                        },
                      },
                    },
                    yaxis: {
                      title: {
                        text: yAxis || "",
                        style: {
                          fontSize: "14px",
                          fontWeight: "semibold",
                          color: "#333",
                        },
                      },
                    },
                  }
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
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-bold">
          Edit Query Builder for ID: {graphId}
        </h1>
        {role === userRole.SUPER_ADMIN && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(PATH.queryBuilder)}
              className="btn-primary w-48 rounded-md h-9 p-0"
            >
              Add new query
            </button>
            <Dropdown buttonText={selectedTenant} />
          </div>
        )}
      </div>

      <div className="bg-gray-100">
        <div className="flex justify-between items-center border-b border-gray-300 px-3 py-2">
          {/* <h4>Sample Database</h4> */}
          <div className="w-96">
            <InputField
              value={chartInputValue}
              onChange={(e) => setChartInputValue(e.target.value)}
              placeholder="Enter Chart Title"
            />
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
      <QueryBuilderTab
        setQueryBuilderTab={setQueryBuilderTab}
        queryBuilderTab={queryBuilderTab}
      />
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
          onClose={() => setQueryBuilderTab("")}
          columnNames={columnNames}
          xAxis={xAxis}
          setXAxis={setXAxis}
          yAxis={yAxis}
          setYAxis={setYAxis}
          selectedXAxisCol={selectedXAxisCol}
          setSelectedXAxisCol={setSelectedXAxisCol}
          selectedYAxisCol={selectedYAxisCol}
          setSelectedYAxisCol={setSelectedYAxisCol}
        />
      </CustomFlyoutModal>
    </div>
  );
};

export default EditQueryBuilder;
