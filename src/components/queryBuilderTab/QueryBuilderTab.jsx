import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { queryBuilderTabEnum } from "shared/constant";

const QueryBuilderTab = ({ setQueryBuilderTab, queryBuilderTab }) => {
  return (
    <div className="pt-10 pb-3">
      <span className="isolate inline-flex rounded-md shadow-sm gap-1">
        <button
          type="button"
          onClick={() => setQueryBuilderTab(queryBuilderTabEnum.VISUALIZATION)}
          className={`relative inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 text-sm font-semibold ${
            queryBuilderTab === queryBuilderTabEnum.VISUALIZATION
              ? "text-indigo-600 bg-indigo-100 hover:bg-indigo-50"
              : "text-gray-900 bg-white hover:bg-gray-50"
          }  ring-1 ring-inset ring-gray-300 focus:z-10`}
        >
          Visualization
        </button>
        <button
          type="button"
          onClick={() => setQueryBuilderTab(queryBuilderTabEnum.SETTING)}
          className={`relative -ml-px inline-flex items-center rounded-r-md ${
            queryBuilderTab === queryBuilderTabEnum.SETTING
              ? "bg-indigo-100 hover:bg-indigo-50"
              : "bg-white hover:bg-gray-50"
          } px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10`}
        >
          <Cog6ToothIcon
            aria-hidden="true"
            className={`-ml-0.5 size-5 ${
              queryBuilderTab === queryBuilderTabEnum.SETTING
                ? "text-indigo-600"
                : "text-gray-400"
            }`}
          />
        </button>
      </span>
    </div>
  );
};

export default QueryBuilderTab;
