import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Chart from "react-apexcharts";
import { Navigate, useNavigate } from "react-router-dom";
import Dropdown from "shared/components/customInput/dropDown";
import { dummyData } from "shared/dummyData";
import { options } from "shared/helper";

const TENANTS = [
  {
    title: "Tenant one",
    id: 1,
  },
  {
    title: "Tenant two",
    id: 2,
  },
  {
    title: "Tenant three",
    id: 3,
  },
];
// const dropdownItems = [
//   { type: "link", label: "Account settings", href: "/account" },
//   { type: "link", label: "Support", href: "/support" },
//   { type: "button", label: "License", action: () => alert("License clicked!") },
//   { type: "button", label: "Sign out", action: () => alert("Signed out!") },
// ];

const Dashboard = () => {

  const navigate = useNavigate();

  // const handleEditClick = (id) => {
  //   // Navigate to EditQueryBuilder with the dummy ID in the URL
  //   navigate(`/edit-querybuilder?id=${id}`);
  // };
  const handleEditClick = (id) => {
    navigate('/edit-querybuilder', { state: { id } });
  };
  
  return (
    <div>
      <div className="flex justify-end py-10">
      {/* <Dropdown buttonText="Menu" items={dropdownItems} /> */}

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Select Tenant
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >

            <div className="py-1">
              {TENANTS.map((item) => (
                <MenuItem>
                  <div
                    key={item.id}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    {item.title}
                  </div>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>
    

      <div className="flex flex-col gap-8">
        {dummyData.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between w-full mb-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6 grid md:grid-cols-2 gap-8">
                  {item.data.map((seriesData, index) => (
                    <div className="flex flex-col gap-3 items-end border border-gray-200 rounded-lg p-2">
                      <button
                        type="button"
                        className="w-20 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => handleEditClick(1)} // Navigate with dummy ID
                      >
                        Edit
                      </button>

                      <div className="w-full" key={index}>
                        <Chart
                          series={seriesData}
                          options={options}
                          type={item.type}
                          height={300}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
