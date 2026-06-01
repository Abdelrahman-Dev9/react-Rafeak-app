import Sidebar from "@/components/dashboard/Sidebar";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetDashboardOrdersQuery,
  useGetDashboardStatsQuery,
} from "@/redux/service/dashboard/dashboardApi";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import blueClock from "../assets/blue-clock.png";
import clock from "../assets/clock.png";
import redIcon from "../assets/red-icon.svg";
import right from "../assets/right.png";
import shop from "../assets/shop.png";

// ==================== Data ====================

const chartData = [
  { month: "يناير", total: 1200, completed: 800, cancelled: 150 },
  { month: "فبراير", total: 1800, completed: 1200, cancelled: 200 },
  { month: "مارس", total: 900, completed: 600, cancelled: 100 },
  { month: "أبريل", total: 2200, completed: 1500, cancelled: 300 },
  { month: "مايو", total: 1600, completed: 1000, cancelled: 180 },
  { month: "يونيو", total: 2800, completed: 1900, cancelled: 350 },
  { month: "يوليو", total: 2100, completed: 1400, cancelled: 260 },
  { month: "أغسطس", total: 1400, completed: 950, cancelled: 170 },
  { month: "سبتمبر", total: 1900, completed: 1300, cancelled: 220 },
  { month: "أكتوبر", total: 2500, completed: 1700, cancelled: 400 },
  { month: "نوفمبر", total: 1100, completed: 750, cancelled: 130 },
  { month: "ديسمبر", total: 700, completed: 450, cancelled: 80 },
];

// ==================== Components ====================

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    نشط: "text-[#14AE5C] border-[#14AE5C]",
    معلق: "text-[#BF6A02] border-[#BF6A02]",
    ملغى: "text-[#CC1D1B] border-[#CC1D1B]",
    مكتمل: "text-[#225672] border-[#225672]",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full border text-sm font-medium ${
        styles[status] ?? ""
      }`}
    >
      {status}
    </span>
  );
};

// ==================== Dashboard ====================

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: dashboardStats, isLoading: dashboardStatsLoading } =
    useGetDashboardStatsQuery({});
  const { data: dashboardOrders, isLoading: dashboardOrdersLoading } =
    useGetDashboardOrdersQuery({});

  const totalPages = 16;
  const pageNumbers = [1, 2, 3, 4];

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main Content */}
      <main
        className={`flex-1 p-6 flex flex-col gap-5 transition-all duration-300 ${
          isSidebarOpen ? "mr-56" : "mr-20"
        }`}
      >
        {/* Stats */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-[22px] font-semibold text-[#418FBF] mb-4 text-right">
            نظرة عامة على الخدمة
          </h2>

          <div className="grid grid-cols-5 gap-3">
            <div className="flex flex-col items-start gap-1 p-4 rounded-xl border border-[#E5E3EB]">
              <img src={shop} alt="shop" />
              <span className="text-[20px] font-bold text-[#225672]">
                {dashboardStatsLoading ? (
                  <Spinner className="w-6 h-6" />
                ) : (
                  dashboardStats?.totals?.totalOrders
                )}
              </span>
              <span className="text-[16px] text-[#225672]">
                إجمالي المساعدة
              </span>
            </div>

            <div className="flex flex-col items-start gap-1 p-4 rounded-xl border border-[#E5E3EB]">
              <img src={clock} alt="shop" />
              <span className="text-[20px] font-bold text-[#225672]">
                {dashboardStatsLoading ? (
                  <Spinner className="w-6 h-6" />
                ) : (
                  dashboardStats?.totals?.pending
                )}
              </span>
              <span className="text-[16px] text-[#225672]">معلق</span>
            </div>

            <div className="flex flex-col items-start gap-1 p-4 rounded-xl border border-[#E5E3EB]">
              <img src={blueClock} alt="shop" />
              <span className="text-[20px] font-bold text-[#225672]">
                {dashboardStatsLoading ? (
                  <Spinner className="w-6 h-6" />
                ) : (
                  dashboardStats?.totals?.accepted
                )}
              </span>
              <span className="text-[16px] text-[#225672]">نشط</span>
            </div>

            <div className="flex flex-col items-start gap-1 p-4 rounded-xl border border-[#E5E3EB]">
              <img src={right} alt="shop" />
              <span className="text-[20px] font-bold text-[#225672]">
                {dashboardStatsLoading ? (
                  <Spinner className="w-6 h-6" />
                ) : (
                  dashboardStats?.totals?.completed
                )}
              </span>
              <span className="text-[16px] text-[#225672]">مكتمل</span>
            </div>

            <div className="flex flex-col items-start gap-1 p-4 rounded-xl border border-[#E5E3EB]">
              <img src={redIcon} alt="shop" />
              <span className="text-[20px] font-bold text-[#225672]">
                {dashboardStatsLoading ? (
                  <Spinner className="w-6 h-6" />
                ) : (
                  dashboardStats?.totals?.canceled
                )}
              </span>
              <span className="text-[16px] text-[#225672]">ملغى</span>
            </div>
          </div>
        </section>

        {/* Chart */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-bold text-[#418FBF]">
              إحصائيات المساعدة
            </h2>

            <div className="flex items-center gap-6">
              {/* إجمالي المساعدة */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 rounded-full bg-[#225672]" />
                <span className="text-[14px] font-bold text-[#000000B2]">
                  إجمالي المساعدة
                </span>
              </div>

              {/* مكتمل */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 rounded-full bg-[#B4B0BF]" />
                <span className="text-[14px] font-bold text-[#000000B2]">
                  مكتمل
                </span>
              </div>

              {/* ملغى */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 rounded-full bg-[#EEECF2]" />
                <span className="text-[14px] font-bold text-[#000000B2]">
                  ملغى
                </span>
              </div>

              {/* السنة */}
              <button className=" border border-[#E5E3EB]rounded-[10px] h-10 px-4 flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
                <TiArrowSortedDown className="text-[#418FBF]" />
                <span className="text-[12px] text-[#418FBF]">عام 2024</span>
              </button>
            </div>
          </div>
          {/** Bar chart */}
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[...chartData].reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="total" fill="#225672" />
                <Bar dataKey="completed" fill="#B4B0BF" />
                <Bar dataKey="cancelled" fill="#EEECF2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Table */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-[22px] font-bold text-[#418FBF] mb-4">
            قائمة الخدمات
          </h2>

          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="border-b border-[#E5E3EB]">
                <th className="text-right pb-3 text-[14px] text-[#000000DE]">
                  معرف الخدمة
                </th>
                <th className="text-[14px] text-[#000000DE] text-right pb-3">
                  تاريخ الخدمه
                </th>
                <th className="text-[14px] text-[#000000DE] text-right pb-3">
                  اسم طالب الخدمة
                </th>
                <th className="text-[14px] text-[#000000DE] text-right pb-3">
                  اسم المتطوع
                </th>
                <th className="text-[14px] text-[#000000DE] text-right pb-3">
                  حالة الخدمه
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboardOrdersLoading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center">
                    <div className="flex justify-center">
                      <Spinner className="w-8 h-8" />
                    </div>
                  </td>
                </tr>
              ) : (
                dashboardOrders?.orders?.map((row: any) => (
                  <tr
                    key={row._id}
                    className="border-b border-gray-50 text-[14px] text-[#000000B2]"
                  >
                    <td>{row._id}</td>

                    <td>
                      {new Date(row.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>

                    <td>
                      {row.seeker?.firstName} {row.seeker?.lastName}
                    </td>

                    <td>
                      {row.volunteer?.firstName} {row.volunteer?.lastName}
                    </td>

                    <td className="py-4">
                      <StatusBadge
                        status={
                          row.status === "completed"
                            ? "مكتمل"
                            : row.status === "accepted"
                            ? "نشط"
                            : row.status === "pending"
                            ? "معلق"
                            : row.status === "canceled"
                            ? "ملغى"
                            : row.status
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center gap-1 mt-5" dir="ltr">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <MdChevronLeft />
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page ? "bg-[#41A2D8] text-white" : "border"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            >
              <MdChevronRight />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
