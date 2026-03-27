import { NavLink } from "react-router-dom";
import Icons from "../../icons/Icons";
import Label from "../../../pages/label/Label";
import { useState } from "react";
import useSidebar from "../../../hooks/useSidebar";

const Sidebar = () => {
  const { isCollapsed } = useSidebar();
  const [showLabelModal, setShowLabelModal] = useState(false);

  const menuItems = [
    {
      to: "/notes",
      label: "Notes",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <aside
        className={`h-screen bg-white transition-all duration-300 border-r flex flex-col ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex-grow overflow-y-auto overflow-x-hidden pt-4">
          <ul className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `
                                    relative flex items-center h-12 gap-5 px-6
                                    transition-colors duration-200
                                    ${isActive ? "bg-amber-100 text-amber-900" : "text-gray-600 hover:bg-gray-100"}
                                    rounded-r-full mr-2
                                `}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="text-sm font-medium tracking-wide truncate">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={() => {
                  setShowLabelModal(true);
                }}
                className="w-full relative flex items-center h-12 gap-5 px-6 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-r-full mr-2"
              >
                <span className="flex-shrink-0">
                  <Icons name="DOUBLE_ACCOUNT" />
                </span>
                {!isCollapsed && (
                  <span className="text-sm font-medium tracking-wide truncate">
                    Add Label
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <Label showModal={showLabelModal} setShowModal={setShowLabelModal} />
    </>
  );
};

export default Sidebar;
