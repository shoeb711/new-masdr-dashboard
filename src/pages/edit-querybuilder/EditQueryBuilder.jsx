import { Editor, loader } from "@monaco-editor/react";
import QueryBuilderTab from "components/queryBuilderTab/QueryBuilderTab";
import SettingDrawer from "components/settingDrawer/SettingDrawer";
import VisualizationDrawer from "components/visualizationDrawer/VisualizationDrawer";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useLocation, useParams } from "react-router-dom";
import { masdrDevApi } from "shared/axios";
import CustomFlyoutModal from "shared/components/customFlyoutModal/CustomFlyoutModal";
import Dropdown from "shared/components/customInput/DropDown";
import InputField from "shared/components/customInput/TextArea";
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

const EditQueryBuilder = () => {
  const { chartId } = useParams();
  const {
    state: { singleChartData },
  } = useLocation();

  const [queryValue, setQueryValue] = useState(
    !!singleChartData[0]?.queryValue ? singleChartData[0]?.queryValue : ""
  );
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [queryBuilderTab, setQueryBuilderTab] = useState("");
  const [selectedChartType, setSelectedChartType] = useState(
    !!singleChartData[0].chartType ? singleChartData[0].chartType : "bar"
  );
  const [queryResponse, setQueryResponse] = useState(
    !!singleChartData?.length ? singleChartData : []
  );
  const [chartInputValue, setChartInputValue] = useState(
    !!singleChartData[0]?.name ? singleChartData[0]?.name : ""
  );

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
      });

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

  useEffect(() => {
    if (queryResponse[0]?.chartType)
      setSelectedChartType(queryResponse[0].chartType);
  }, [queryResponse]);

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
            {chartId}
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
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-bold">
          Edit Query Builder for ID: {chartId}
        </h1>
        {role === userRole.SUPER_ADMIN && (
          <Dropdown buttonText={singleChartData[0]?.tenantName} />
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
        <SettingDrawer onClose={() => setQueryBuilderTab("")} />
      </CustomFlyoutModal>
    </div>
  );
};

export default EditQueryBuilder;
