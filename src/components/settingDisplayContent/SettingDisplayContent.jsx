
// import { useState } from "react";

// // Reusable InputField Component
// const InputField = ({
//   id,
//   name,
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   ariaLabel,
//   className = "",
//   ...props
// }) => {
//   return (
//     <input
//       id={id}
//       name={name}
//       type={type}
//       placeholder={placeholder}
//       aria-label={ariaLabel || name}
//       value={value}
//       onChange={onChange}
//       className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
//       {...props}
//     />
//   );
// };

// const SettingDisplayContent = ({ xAxis, setXAxis, yAxis, setYAxis ,onClose}) => {
//   const [tempXAxis, setTempXAxis] = useState(xAxis);
//   const [tempYAxis, setTempYAxis] = useState(yAxis);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = () => {
//     if (!tempXAxis || !tempYAxis) {
//       setErrorMessage("Please fill in both X-axis and Y-axis.");
//       return;
//     }
//     setErrorMessage(""); // Clear error if valid
//     setXAxis(tempXAxis);
//     setYAxis(tempYAxis);
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       {/* Input Fields for X-Axis and Y-Axis */}
//       <div className="flex flex-col gap-4">
//         <div>
//           <label
//             htmlFor="x-axis"
//             className="block text-sm font-medium text-gray-700"
//           >
//             X-Axis
//           </label>
//           <InputField
//             id="x-axis"
//             name="xAxis"
//             placeholder="Enter X-Axis value"
//             value={tempXAxis}
//             onChange={(e) => setTempXAxis(e.target.value)}
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="y-axis"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Y-Axis
//           </label>
//           <InputField
//             id="y-axis"
//             name="yAxis"
//             placeholder="Enter Y-Axis value"
//             value={tempYAxis}
//             onChange={(e) => setTempYAxis(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Error Message */}
//       {errorMessage && (
//         <div className="text-red-600 text-sm font-medium mt-2">
//           {errorMessage}
//         </div>
//       )}

    
//        <button
//         className="btn-primary w-48"
//         onClick={() => {
//           const isValid = handleSubmit();
//           if (isValid) {
//             onClose();
//           }
//         }}
//       >
//         Done
//       </button>
//     </div>
//   );
// };

// export default SettingDisplayContent;

import { useState } from "react";

// Reusable InputField Component
const InputField = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  ariaLabel,
  className = "",
  ...props
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel || name}
      value={value}
      onChange={onChange}
      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
      {...props}
    />
  );
};

const SettingDisplayContent = ({ xAxis, setXAxis, yAxis, setYAxis, onClose }) => {
  const [tempXAxis, setTempXAxis] = useState(xAxis);
  const [tempYAxis, setTempYAxis] = useState(yAxis);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (!tempXAxis || !tempYAxis) {
      setErrorMessage("Please fill in both X-axis and Y-axis.");
      return false; // Return false to indicate invalid input
    }
    setErrorMessage(""); // Clear error if valid
    setXAxis(tempXAxis);
    setYAxis(tempYAxis);
    return true; // Return true to indicate valid input
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input Fields for X-Axis and Y-Axis */}
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="x-axis"
            className="block text-sm font-medium text-gray-700"
          >
            X-Axis
          </label>
          <InputField
            id="x-axis"
            name="xAxis"
            placeholder="Enter X-Axis value"
            value={tempXAxis}
            onChange={(e) => setTempXAxis(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="y-axis"
            className="block text-sm font-medium text-gray-700"
          >
            Y-Axis
          </label>
          <InputField
            id="y-axis"
            name="yAxis"
            placeholder="Enter Y-Axis value"
            value={tempYAxis}
            onChange={(e) => setTempYAxis(e.target.value)}
          />
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-600 text-sm font-medium mt-2">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        className="btn-primary w-48"
        onClick={() => {
          const isValid = handleSubmit();
          if (isValid) {
            onClose(); // Call onClose only if input is valid
          }
        }}
      >
        Done
      </button>
    </div>
  );
};

export default SettingDisplayContent;
