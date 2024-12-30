import { useState } from "react";

const SettingDataContent = ({
  setSelectedYAxisCol,
  selectedYAxisCol,
  setSelectedXAxisCol,
  selectedXAxisCol,
  onClose,
  columnNames = [],
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleXAxisChange = (event) => {
    const value = event.target.value;
    setSelectedXAxisCol(value);
    setErrorMessage(""); // Clear error message on change
  };

  const handleYAxisChange = (event) => {
    const value = event.target.value;
    setSelectedYAxisCol(value);
    setErrorMessage(""); // Clear error message on change
  };

  const handleSubmit = () => {
    if (!selectedXAxisCol || !selectedYAxisCol) {
      setErrorMessage("Please select both X-axis and Y-axis.");
      return false; // Indicate submission failed
    }

    if (selectedXAxisCol === selectedYAxisCol) {
      setErrorMessage("X-axis and Y-axis cannot be the same.");
      return false; // Indicate submission failed
    }

    // setErrorMessage(""); // Clear error if valid
    // alert(
    //   `Selections are valid! X-axis: ${selectedXAxisCol}, Y-axis: ${selectedYAxisCol}`
    // );
    return true; // Indicate submission succeeded
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-sm mx-auto">
      {/* X-axis Selection */}
      <div className="flex flex-col items-center gap-2 w-full">
        <label htmlFor="x-axis" className="text-sm font-medium text-gray-600">
          Select X-axis
        </label>
        <select
          id="x-axis"
          className="w-full p-2 bg-white-200 border border-gray-400 rounded-md text-sm focus:ring-2 focus:ring-indigo-600 transition duration-200"
          onChange={handleXAxisChange}
          value={selectedXAxisCol}
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
          value={selectedYAxisCol}
        >
          <option value=""></option>
          {columnNames.map((column, index) => (
            <option
              key={index}
              value={column}
              disabled={column === selectedXAxisCol} // Disable option if it's already selected as X-axis
            >
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
      <div className="flex justify-center" >
      <button
        className="btn-primary w-48"
        onClick={() => {
          const isValid = handleSubmit();
          if (isValid) {
            onClose();
          }
        }}
      >
        Done
      </button>
      </div>
  
    </div>
  );
};

export default SettingDataContent;

