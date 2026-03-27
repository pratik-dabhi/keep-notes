import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Search from "../common/Search";
import useAuth from "../../hooks/useAuth";
import useSidebar from "../../hooks/useSidebar";
import Icons from "../icons/Icons";
import EditProfile from "../../pages/settings/components/EditProfile";

const Header = () => {
  const { Logout, loggedUser } = useAuth();
  const { isCollapsed, setCollapsed } = useSidebar();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onSearchHandler = (slug: string) => {
    // Dispatch search event for components to listen to
    const event = new CustomEvent("app-search", { detail: slug });
    window.dispatchEvent(event);
  };

  const handleLogout = () => {
    Logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userInitials = loggedUser?.username
    ? loggedUser.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";

  return (
    <header className="h-16 border-b bg-white flex items-center gap-4 px-4 sticky top-0 z-50">
      <div className="flex items-center gap-2 min-w-[200px] md:min-w-[280px]">
        <button
          onClick={() => setCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Main menu"
        >
          <Icons name="MENU" className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-gray-700 hidden sm:block">
            {import.meta.env.VITE_APP_NAME || "Keep Notes"}
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl">
        <Search placeholder="Search" onSearchHandler={onSearchHandler} />
      </div>

      <div
        className="flex items-center gap-2 min-w-[120px] md:min-w-[200px] justify-end relative ml-auto"
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 focus:outline-none"
          title="Account"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-600 text-white font-medium text-sm shadow-sm">
            {userInitials}
          </div>
          {loggedUser && (
            <span className="text-sm font-medium text-gray-700 hidden lg:block pr-2">
              {loggedUser.username}
            </span>
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-[100]">
            <div className="px-4 py-2 border-b border-gray-100 mb-2">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {loggedUser?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {loggedUser?.email}
              </p>
            </div>

            <button
              onClick={() => {
                setShowEditModal(true);
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
            >
              <Icons name="PEN" className="w-4 h-4" />
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
            >
              <Icons name="LOGOUT" className="w-4 h-4 text-red-600" />
              Logout
            </button>
          </div>
        )}
      </div>

      {showEditModal && loggedUser && (
        <EditProfile
          setShowModal={setShowEditModal}
          user={{
            id: loggedUser.id,
            email: loggedUser.email,
            username: loggedUser.username,
          }}
        />
      )}
    </header>
  );
};

export default Header;
