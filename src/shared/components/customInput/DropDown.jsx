import React, { useState } from "react";

const Dropdown = ({ buttonText = "Options", items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (action) => {
    if (typeof action === "function") {
      action();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {buttonText}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "link" && (
                  <a
                    href={item.href || "#"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => handleItemClick(item.action)}
                  >
                    {item.label}
                  </a>
                )}
                {item.type === "button" && (
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => handleItemClick(item.action)}
                  >
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
