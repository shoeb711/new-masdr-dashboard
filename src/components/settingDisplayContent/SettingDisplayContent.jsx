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

// // // Main Component
// // const SettingDisplayContent = () => {
// //   const [selectedTab, setSelectedTab] = useState("Some");
// //   const [xAxis, setXAxis] = useState("");
// //   const [yAxis, setYAxis] = useState("");

// //   const tabs = [{ name: "Some" }, { name: "All" }];

// //   function classNames(...classes) {
// //     return classes.filter(Boolean).join(" ");
// //   }

// //   return (
// //     <div className="flex flex-col gap-4">
// //       <div className="flex flex-col gap-2">
// //         <p>Values to show</p>
// //         <div className="isolate flex divide-x divide-indigo-600 rounded-lg border border-indigo-600">
// //           {tabs.map((tab, tabIdx) => (
// //             <button
// //               key={tab.name}
// //               onClick={() => setSelectedTab(tab.name)}
// //               className={classNames(
// //                 selectedTab === tab.name
// //                   ? "text-white"
// //                   : "text-gray-500 hover:text-gray-700",
// //                 tabIdx === 0 ? "rounded-l-lg" : "",
// //                 tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
// //                 `group relative min-w-0 flex-1 overflow-hidden ${
// //                   selectedTab === tab.name
// //                     ? "bg-indigo-600 hover:bg-indigo-500"
// //                     : "bg-white hover:bg-gray-50"
// //                 }  px-4 py-2 text-center text-sm font-medium focus:z-10`
// //               )}
// //             >
// //               <span>{tab.name}</span>
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Input Fields for X-Axis and Y-Axis */}
// //       <div className="flex flex-col gap-4">
// //         <div>
// //           <label
// //             htmlFor="x-axis"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             X-Axis
// //           </label>
// //           <InputField
// //             id="x-axis"
// //             name="xAxis"
// //             placeholder="Enter X-Axis value"
// //             value={xAxis}
// //             onChange={(e) => setXAxis(e.target.value)}
// //           />
// //         </div>

// //         <div>
// //           <label
// //             htmlFor="y-axis"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             Y-Axis
// //           </label>
// //           <InputField
// //             id="y-axis"
// //             name="yAxis"
// //             placeholder="Enter Y-Axis value"
// //             value={yAxis}
// //             onChange={(e) => setYAxis(e.target.value)}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SettingDisplayContent;
// const SettingDisplayContent = ({ xAxis, setXAxis, yAxis, setYAxis }) => {
//   // const [selectedTab, setSelectedTab] = useState("Some");

//   // const tabs = [{ name: "Some" }, { name: "All" }];

//   // function classNames(...classes) {
//   //   return classes.filter(Boolean).join(" ");
//   // }
//   // console.log(xAxis,yAxis,"wdwFEWFWEFJNWJFNJWEBFBEWHFBHBWHFBHWEBFBWHEJF");

//   return (
//     <div className="flex flex-col gap-4">
//       {/* <div className="flex flex-col gap-2">
//         <p>Values to show</p>
//         <div className="isolate flex divide-x divide-indigo-600 rounded-lg border border-indigo-600">
//           {tabs.map((tab, tabIdx) => (
//             <button
//               key={tab.name}
//               onClick={() => setSelectedTab(tab.name)}
//               className={classNames(
//                 selectedTab === tab.name
//                   ? "text-white"
//                   : "text-gray-500 hover:text-gray-700",
//                 tabIdx === 0 ? "rounded-l-lg" : "",
//                 tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
//                 `group relative min-w-0 flex-1 overflow-hidden ${
//                   selectedTab === tab.name
//                     ? "bg-indigo-600 hover:bg-indigo-500"
//                     : "bg-white hover:bg-gray-50"
//                 }  px-4 py-2 text-center text-sm font-medium focus:z-10`
//               )}
//             >
//               <span>{tab.name}</span>
//             </button>
//           ))}
//         </div>
//       </div> */}

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
//             value={xAxis}
//             onChange={(e) => setXAxis(e.target.value)}
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
//             value={yAxis}
//             onChange={(e) => setYAxis(e.target.value)}
//           />
//         </div>
//       </div>
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

const SettingDisplayContent = ({ xAxis, setXAxis, yAxis, setYAxis }) => {
  const [tempXAxis, setTempXAxis] = useState(xAxis);
  const [tempYAxis, setTempYAxis] = useState(yAxis);

  const handleSubmit = () => {
    if (tempXAxis && tempYAxis) {
      setXAxis(tempXAxis);
      setYAxis(tempYAxis);
    } else {
      alert("Please fill in both X-axis and Y-axis.");
    }
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default SettingDisplayContent;
