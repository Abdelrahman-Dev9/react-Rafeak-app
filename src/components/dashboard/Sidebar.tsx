import {
  MdBarChart,
  MdBookmarks,
  MdChevronLeft,
  MdChevronRight,
  MdDashboard,
  MdLogout,
  MdNotifications,
  MdPeople,
  MdSupervisorAccount,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.png";

const navItems = [
  { label: "لوحة التحكم", icon: MdDashboard, badge: null, path: "/dashboard" },
  { label: "قائمة التتبع", icon: MdBookmarks, badge: 5, path: "/tracking" },
  { label: "المستخدمون", icon: MdPeople, badge: 45, path: "/users" },
  { label: "المديرون", icon: MdSupervisorAccount, badge: 10, path: "/admins" },
  {
    label: "الإشعارات",
    icon: MdNotifications,
    badge: 3,
    path: "/notifications",
  },
  { label: "التقارير", icon: MdBarChart, badge: null, path: "/reports" },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed right-0 top-0 h-screen bg-white shadow-sm z-20 transition-all duration-300
      ${isOpen ? "w-56" : "w-20"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -translate-y-1/2 -left-5 w-7 h-7 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all z-50 cursor-pointer"
      >
        {isOpen ? <MdChevronRight size={18} /> : <MdChevronLeft size={18} />}
      </button>

      {/* Header */}
      <div className="border-b border-gray-100 p-4 flex justify-center">
        {isOpen ? (
          <div className="flex items-center gap-2 mr-[-120px]">
            <img src={logo} alt="logo" className="w-20 h-20" />
            <span className="font-bold text-xl text-[#418FBF]">رفيق</span>
          </div>
        ) : (
          <img src={logo} alt="logo" className="w-8 h-8" />
        )}
      </div>

      {/* Nav */}
      <nav className="p-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center text-[14px] ${
                isOpen ? "justify-between" : "justify-center"
              } px-3 py-3 rounded-xl transition-colors cursor-pointer ${
                isActive ? "bg-[#EEECF2] text-[#418FBF]" : "text-[#418FBF] "
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="text-xl" />
                {isOpen && <span>{item.label}</span>}
              </div>

              {isOpen && item.badge !== null && (
                <span className="bg-[#EEECF2] text-[#418FBF] text-[14px] p-3 rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t border-gray-100 p-3">
        <button
          onClick={() => navigate("/login")}
          className={`w-full flex items-center ${
            isOpen ? "gap-2" : "justify-center"
          } text-[#418FBF] cursor-pointer`}
        >
          <MdLogout size={20} />
          {isOpen && <span>تسجيل الخروج</span>}
        </button>

        {isOpen && (
          <div className="flex items-center gap-2 mt-4">
            <img src={avatar} alt="avatar" />
            <div>
              <p className="text-xs text-gray-400">مرحبا بعودتك 👋</p>
              <p className="text-xs font-semibold">محمد عبد العاطي</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
