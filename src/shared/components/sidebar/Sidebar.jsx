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
  },
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
      {currentUserRole !== "user" && (
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
      )}
    </div>
  );
};

export default Sidebar;
