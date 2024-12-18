import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { PATH, userRole } from "shared/constant";

const navigation = [
  {
    name: "Dashboard",
    href: PATH.dashboard,
    icon: HomeIcon,
    role: [userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER],
  },
  {
    name: "Query Builder",
    href: PATH.queryBuilder,
    icon: UsersIcon,
    role: [userRole.ADMIN, userRole.SUPER_ADMIN],
    // role: [ userRole.SUPER_ADMIN],
  },
  // {
  //   name: " Edit Query Builder",
  //   href: PATH.editqueryBuilder,
  //   icon: UsersIcon,
  //   role: [userRole.ADMIN, userRole.SUPER_ADMIN],
  //   // role: [ userRole.SUPER_ADMIN],
  // },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const currentUserRole = localStorage.getItem("role");

  return (
    <div>
      {/* Collapsible Sidebar */}
      <div
        className={classNames(
          "lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-transform duration-300",
          isSidebarOpen ? "lg:w-72" : "lg:w-16"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-between">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation
                    .filter((item) => item.role.includes(currentUserRole)) // Role-based access
                    .map((item) => {
                      const isActive = item.href === location.pathname;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={classNames(
                              isActive
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              `group ${
                                isSidebarOpen ? "flex" : "inline-block"
                              } items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold`
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                isActive
                                  ? "text-indigo-600"
                                  : "text-gray-400 group-hover:text-indigo-600",
                                "size-6 shrink-0"
                              )}
                            />
                            {isSidebarOpen && item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* <div
        className={classNames(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "pl-72" : "pl-16"
        )}
      >
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />
          <div className="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
              />
              {/* Profile dropdown */}
              {/* <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full bg-gray-50"
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm/6 font-semibold text-gray-900"
                    >
                      Tom Cook
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 size-5 text-gray-400"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
