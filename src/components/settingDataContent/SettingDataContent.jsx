
// const SettingDataContent = ({ columnNames = [] }) => {
//   const handleXAxisChange = (event) => {
//     console.log(`X-axis: ${event.target.value} selected`);
//   };

//   const handleYAxisChange = (event) => {
//     console.log(`Y-axis: ${event.target.value} selected`);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-4 w-full max-w-sm mx-auto">
//       {/* X-axis Selection */}
//       <div className="flex flex-col items-center gap-2 w-full">
//         <label htmlFor="x-axis" className="text-sm font-medium text-gray-600">
//           Select X-axis
//         </label>
//         <select
//           id="x-axis"
//           className="w-full p-2 bg-white-200 border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-indigo-600 transition duration-200"
//           onChange={handleXAxisChange}
//         >
//           <option value="">Select X-axis</option>
//           {columnNames.map((column, index) => (
//             <option key={index} value={column}>
//               {column}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Y-axis Selection */}
//       <div className="flex flex-col items-center gap-2 w-full">
//         <label htmlFor="y-axis" className="text-sm font-medium text-gray-600">
//           Select Y-axis
//         </label>
//         <select
//           id="y-axis"
//           className="w-full p-2 bg-white-200 border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-indigo-600 transition duration-200"
//           onChange={handleYAxisChange}
//         >
//           <option value="">Select Y-axis</option>
//           {columnNames.map((column, index) => (
//             <option key={index} value={column}>
//               {column}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default SettingDataContent;

import { useState } from "react";

const SettingDataContent = ({ columnNames = [] }) => {
  const [selectedXAxis, setSelectedXAxis] = useState("");
  const [selectedYAxis, setSelectedYAxis] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleXAxisChange = (event) => {
    const value = event.target.value;
    setSelectedXAxis(value);
    setErrorMessage(""); // Clear error message on change

  };

  const handleYAxisChange = (event) => {
    const value = event.target.value;
    setSelectedYAxis(value);
    setErrorMessage(""); // Clear error message on change
    console.log(`Y-axis: ${value} selected`);
  };

  const handleSubmit = () => {
    if (!selectedXAxis || !selectedYAxis) {
      setErrorMessage("Please select both X-axis and Y-axis.");
      return;
    }

    alert("Selections are valid!");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-sm mx-auto">
      {/* X-axis Selection */}
      <div className="flex flex-col items-center gap-2 w-full">
        <label  htmlFor="x-axis" className="text-sm font-medium text-gray-600">
          Select X-axis
        </label>
        <select
          id="x-axis"
          className="w-full p-2 bg-white-200 border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-indigo-600 transition duration-200"
          onChange={handleXAxisChange}
        >
          <option value=""></option>
          {columnNames.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>

      {/* Y-axis Selection */}
      <div className="flex flex-col items-center gap-2 w-full">
        <label htmlFor="y-axis" className="text-sm font-medium text-gray-600">
          Select Y-axis
        </label>
        <select
          id="y-axis"
          className="w-full p-2 bg-white-200 border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-indigo-600 transition duration-200"
          onChange={handleYAxisChange}
        >
          <option value=""></option>
          {columnNames.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
      )}

      {/* Submit Button */}
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default SettingDataContent;

