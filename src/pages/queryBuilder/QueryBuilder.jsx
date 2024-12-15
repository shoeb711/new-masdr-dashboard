import Chart from "react-apexcharts";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Editor, loader } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { masdrDevApi } from "shared/axios";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { queryResponseChartOptions } from "shared/helper";

const editorEvents = [
  {
    name: "Clear",
    icon: XMarkIcon,
    action: (editor) => {
      editor.setValue("");
    },
  },
  {
    name: "Undo",
    icon: ArrowUturnLeftIcon,
    action: (editor) => {
      editor.trigger("source", "undo", null);
    },
  },
  {
    name: "Redo",
    icon: ArrowUturnRightIcon,
    action: (editor) => {
      editor.trigger("source", "redo", null);
    },
  },
  {
    name: "Run Query",
    icon: PlayIcon,
  },
];

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

      console.log("response =>", response.data);
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
            {!!queryResponse?.length ? queryResponse[0]?.name : ""}
          </p>
          <Chart
            options={queryResponseChartOptions}
            series={queryResponse}
            type="bar"
            height="350"
          />
        </div>
      );
    }
  };

  return (
    <div>
      <div className="bg-gray-100">
        <h4 className="w-full border-b border-gray-300 px-3 py-2">
          Sample Database
        </h4>
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
  );
};

export default QueryBuilder;
