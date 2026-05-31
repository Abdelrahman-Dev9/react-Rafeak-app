import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow p-10 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-[#2b2196] mb-2">لوحة التحكم</h1>
        <p className="text-gray-500 mb-6">أهلاً، مرحباً بك في لوحة التحكم</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition"
          style={{ background: "linear-gradient(90deg, #00c8c8, #00b0b0)" }}
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
